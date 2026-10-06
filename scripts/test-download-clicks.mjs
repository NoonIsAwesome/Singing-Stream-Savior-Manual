import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
const source = readFileSync(new URL("../assets/js/download-clicks.js", import.meta.url), "utf8");
const href = "https://github.com/NoonIsAwesome/Singing-Stream-Savior-Updates/releases/download/v2.1.5.4/Singing.Stream.Savior.2.1.5.4.zip";
const tick = () => new Promise(resolve => setImmediate(resolve));
function browser(options = {}) {
  const calls = [], listeners = {}, timers = new Map(); let nextTimer = 0;
  const dataset = { analyticsProvider: "counterapi-v2", analyticsHost: "noonisawesome.github.io",
    analyticsBasePath: "/Singing-Stream-Savior-Manual/", counterWorkspace: "fixture-workspace", counterName: "views",
    downloadCounterEnabled: "true", downloadCounterName: "downloads", downloadClickMirrorUrl: "", ...options.dataset };
  const forbidden = () => { throw Error("No DOM changes, storage access or navigation hijacking allowed"); };
  const document = { body: { dataset, appendChild: forbidden },
    addEventListener(type, fn, opts) { assert.equal(opts.passive, true); (listeners[type] ||= []).push(fn); } };
  const window = { location: { href: "https://noonisawesome.github.io/Singing-Stream-Savior-Manual/resources.html",
    protocol: "https:", hostname: "noonisawesome.github.io", pathname: "/Singing-Stream-Savior-Manual/resources.html", search: "", ...options.location },
    setTimeout(fn, ms) { assert.equal(ms, 5000); timers.set(++nextTimer, fn); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
    fetch(url, init) { calls.push({ url, init }); if(options.fetch) return options.fetch(url, init);
      if(options.fail) return Promise.reject(Error("offline"));
      return Promise.resolve({ ok: !options.status, status: options.status || 200,
        json: async() => { if(options.badJson) throw Error("bad JSON"); return options.payload ?? {code:200,data:{up_count:1,down_count:0}}; } }); } };
  Object.defineProperty(document, "cookie", { get: forbidden, set: forbidden });
  Object.defineProperty(window, "localStorage", { get: forbidden });
  if(options.noBody) document.body = null;
  if(options.noFetch) delete window.fetch;
  const context = { document, window, navigator: options.navigator || {}, URL, URLSearchParams, AbortController: options.noAbort ? undefined : AbortController };
  const run = () => runInNewContext(source, context);
  const event = (props={}) => ({ type:"click",button:0,detail:1,isTrusted:true,defaultPrevented:false,
    target:{ closest:() => ({ href, getAttribute:() => null }) }, preventDefault:forbidden, ...props });
  const emit = e => { for(const fn of listeners[e.type] || []) fn(e); };
  run(); return { calls, dataset, timers, listeners, window, run, event, emit };
}
const r2 = "https://updates.noonisawesome.dev/releases/v2.1.7.3/Singing.Stream.Savior.2.1.7.3.zip";
test("revision2 ZIP names work for GitHub and the R2 mirror", async () => {
  const revisedMirror = r2.replace(".zip", "-revision2.zip");
  for (const [url, provider] of [[href.replace(".zip", "-revision2.zip"), null], [revisedMirror, "r2"]]) {
    const b = browser({dataset:{downloadClickMirrorUrl:revisedMirror}});
    b.emit(b.event({target:{closest:()=>({href:url,getAttribute:()=>provider})}}));
    await tick(); assert.equal(b.calls.length, 1);
  }
});
test("approved R2 full ZIP shares the website click counter", async () => {
  const b = browser({dataset:{downloadClickMirrorUrl:r2}});
  b.emit(b.event({target:{closest:()=>({href:r2,getAttribute:name=>name==="data-download-source"?"r2":null})}}));
  await tick(); assert.equal(b.calls.length,1); assert.equal(b.dataset.downloadAnalyticsState,"accepted");
});
for (const bad of [r2.replace(".dev/", ".dev.evil.example/"), r2.replace("https:", "http:"), r2+"?secret=1", r2.replace(".zip", ".exe"), r2.replace("/releases/", "/other/")]) test(`reject R2 mirror ${bad}`, async()=>{
  const b = browser({dataset:{downloadClickMirrorUrl:bad}});
  b.emit(b.event({target:{closest:()=>({href:bad,getAttribute:name=>name==="data-download-source"?"r2":null})}}));
  await tick(); assert.equal(b.calls.length,0);
});
test("page load alone sends no download click; navigation is not delayed", async() => {
  const b=browser(); assert.equal(b.calls.length,0); assert.equal(b.dataset.downloadAnalyticsState,"ready");
  b.emit(b.event()); assert.equal(b.calls.length,1); await tick();
  assert.equal(b.calls[0].url,"https://api.counterapi.dev/v2/fixture-workspace/downloads/up");
  assert.equal(b.dataset.downloadAnalyticsState,"accepted"); assert.equal(b.timers.size,0);
  const init=b.calls[0].init;
  for(const [key,value] of Object.entries({method:"GET",mode:"cors",credentials:"omit",cache:"no-store",keepalive:true,referrerPolicy:"no-referrer",redirect:"error"})) assert.equal(init[key],value);
  assert.equal(init.headers,undefined);
});
for(const [name,props] of [["keyboard",{detail:0}],["middle click",{type:"auxclick",button:1}],["Ctrl click",{ctrlKey:true}],["Meta click",{metaKey:true}]]) test(`${name} counts once`,async()=>{
  const b=browser();b.emit(b.event(props));await tick();assert.equal(b.calls.length,1);
});
test("nested icon and text-node targets find the link",async()=>{
  const b=browser(),e=b.event();e.target={nodeType:3,parentElement:e.target};b.emit(e);await tick();assert.equal(b.calls.length,1);
});
for(const [name,props] of [["synthetic",{isTrusted:false}],["cancelled",{defaultPrevented:true}],["double-click second event",{detail:2}],["right click",{type:"auxclick",button:2}],["middle button click event",{button:1}],["non-link",{target:{}}]]) test(`skip ${name}`,async()=>{
  const b=browser();b.emit(b.event(props));await tick();assert.equal(b.calls.length,0);
});
test("duplicate initialization or same event never counts twice, later clicks still count",async()=>{
  const b=browser();b.run();assert.equal(b.listeners.click.length,1);
  const e=b.event();b.emit(e);b.emit(e);b.emit(b.event());await tick();assert.equal(b.calls.length,2);
});
for(const bad of ["/Singing-Stream-Savior-Manual/resources.html",href.replace(".zip",".exe"),href.replace(".zip","-LGPL-Relink-Kit.zip"),href.replace("NoonIsAwesome","other"),href.replace("github.com","github.com.evil.example"),"https://github.com/NoonIsAwesome/Singing-Stream-Savior-Updates/releases/latest",href.replace("Singing.Stream.Savior.2.1.5.4.zip","Runtime.zip"),"javascript:alert(1)",href.replace("https:","http:")]) test(`not a package: ${bad}`,async()=>{
  const b=browser();b.emit(b.event({target:{closest:()=>({href:bad,getAttribute:()=>null})}}));await tick();assert.equal(b.calls.length,0);
});
test("future releases and latest/download package URLs work",async()=>{
  const b=browser();for(const url of [href.replaceAll("2.1.5.4","9.2.0.1"),href.replace("download/v2.1.5.4","latest/download")]) b.emit(b.event({target:{closest:()=>({href:url,getAttribute:()=>null})}}));
  await tick();assert.equal(b.calls.length,2);
});
for(const options of [{dataset:{downloadCounterEnabled:"false"}},{dataset:{downloadCounterEnabled:"yes"}},{dataset:{downloadCounterName:""}},{dataset:{downloadCounterName:"views"}},{dataset:{counterWorkspace:"../x"}},{navigator:{webdriver:true}},{navigator:{doNotTrack:"1"}},{navigator:{globalPrivacyControl:true}},{location:{hostname:"localhost"}},{location:{protocol:"http:"}},{location:{pathname:"/Other/"}},{location:{search:"?analytics=off"}},{noFetch:true},{noAbort:true}]) test(`disabled/invalid/excluded: ${JSON.stringify(options)}`,async()=>{
  const b=browser(options);b.emit(b.event());await tick();assert.equal(b.calls.length,0);
});
test("opt-out added after binding is respected",async()=>{const b=browser();b.window.location.search="?analytics=off";b.emit(b.event());await tick();assert.equal(b.calls.length,0);});
for(const options of [{fail:true},{status:404},{status:429},{status:503},{badJson:true},{payload:{code:200,data:{up_count:null,down_count:0}}}]) test(`failure never retries or blocks another download: ${JSON.stringify(options)}`,async()=>{
  const b=browser(options);b.emit(b.event());await tick();assert.equal(b.calls.length,1);assert.equal(b.timers.size,0);
  b.emit(b.event());await tick();assert.equal(b.calls.length,2);
});
test("timeout does not retry",async()=>{
  const b=browser({fetch:(url,init)=>new Promise((resolve,reject)=>init.signal.addEventListener("abort",()=>reject(Error("timeout"))))});
  b.emit(b.event());for(const fn of b.timers.values())fn();await tick();assert.equal(b.calls.length,1);assert.equal(b.timers.size,0);
});
const gigafile = "https://57.gigafile.nu/0105-o91b142bdcfa3da79b0abc49b8830fcdb";
function gigafileLink(href = gigafile, source = "gigafile") {
  return { href, getAttribute: name => name === "data-download-source" ? source : null };
}
test("configured GigaFile full-package link increments the existing counter once",async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:gigafile}}),e=b.event({target:{closest:()=>gigafileLink()}});
  assert.equal(b.calls.length,0);b.emit(e);b.emit(e);await tick();assert.equal(b.calls.length,1);
  assert.equal(b.calls[0].url,"https://api.counterapi.dev/v2/fixture-workspace/downloads/up");
  assert.equal(b.dataset.downloadAnalyticsState,"accepted");
});
test("GitHub full-package link remains counted when GigaFile is configured",async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:gigafile}});b.emit(b.event());await tick();
  assert.equal(b.calls.length,1);assert.equal(b.calls[0].url,"https://api.counterapi.dev/v2/fixture-workspace/downloads/up");
});
test("empty mirror configuration does not count a GigaFile link",async()=>{
  const b=browser();b.emit(b.event({target:{closest:()=>gigafileLink()}}));await tick();assert.equal(b.calls.length,0);
});
test("official GigaFile jp mirror increments the counter",async()=>{
  const mirror=gigafile.replace(".gigafile.nu/", ".gigafile.jp/");
  const b=browser({dataset:{downloadClickMirrorUrl:mirror}});
  b.emit(b.event({target:{closest:()=>gigafileLink(mirror)}}));await tick();
  assert.equal(b.calls.length,1);assert.equal(b.dataset.downloadAnalyticsState,"accepted");
});
test("an unconfigured GigaFile domain alias does not count",async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:gigafile}});
  b.emit(b.event({target:{closest:()=>gigafileLink(gigafile.replace(".gigafile.nu/", ".gigafile.jp/"))}}));await tick();
  assert.equal(b.calls.length,0);
});
for(const bad of ["https://gigafile.nu/ab12-cd34", "http://12.gigafile.nu/ab12-cd34", "https://12.gigafile.nu:443/ab12-cd34", "https://user@12.gigafile.nu/ab12-cd34", "https://evil.example/ab12-cd34", "https://gigafile.jp/ab12-cd34", "https://files.gigafile.jp/ab12-cd34", "https://12.gigafile.jp.evil.example/ab12-cd34", "https://12.gigafile.nu.evil.example/ab12-cd34", "http://12.gigafile.jp/ab12-cd34", "https://user@12.gigafile.jp/ab12-cd34"]) test(`reject invalid configured GigaFile URL ${bad}`,async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:bad}});b.emit(b.event({target:{closest:()=>gigafileLink(bad)}}));await tick();assert.equal(b.calls.length,0);
});
test("GigaFile configuration and click URLs with queries are rejected",async()=>{
  const withQuery=`${gigafile}?token=unexpected`,b=browser({dataset:{downloadClickMirrorUrl:withQuery}});
  b.emit(b.event({target:{closest:()=>gigafileLink(withQuery)}}));await tick();assert.equal(b.calls.length,0);
});
test("different GigaFile token URL is not counted",async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:gigafile}});b.emit(b.event({target:{closest:()=>gigafileLink(gigafile.replace("0105-o91b","0105-x91b"))}}));await tick();assert.equal(b.calls.length,0);
});
test("GigaFile URL requires the explicit gigafile source marker",async()=>{
  const b=browser({dataset:{downloadClickMirrorUrl:gigafile}});b.emit(b.event({target:{closest:()=>gigafileLink(gigafile,"github")}}));await tick();assert.equal(b.calls.length,0);
});
test("missing body is harmless",()=>{browser({noBody:true});});
