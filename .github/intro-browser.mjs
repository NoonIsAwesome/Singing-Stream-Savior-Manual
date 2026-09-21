import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdtempSync,rmSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import {setTimeout as sleep} from 'node:timers/promises';
const root=resolve('_site'),base='/Singing-Stream-Savior-Manual/';
const copy=JSON.parse(readFileSync('_data/stream_routes.json','utf8'));
const out=join(process.env.RUNNER_TEMP||tmpdir(),'advanced-intro-checks');mkdirSync(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=createServer((req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(!path.startsWith(base)){res.writeHead(404);res.end();return;}
    const file=resolve(root,path.slice(base.length)||'index.html');
    if(!file.startsWith(root+'/')||!existsSync(file)){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(readFileSync(file));
  }catch{res.writeHead(404);res.end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const profile=mkdtempSync(join(tmpdir(),'s3s-intro-chrome-'));
const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:['ignore','ignore','pipe']});
let stderr='',spawnError;
chrome.stderr.on('data',data=>{stderr=(stderr+data.toString()).slice(-8000);});
chrome.on('error',error=>{spawnError=error;});
let socket,nextId=0,eventError;const pending=new Map(),results=[];
try{
  let tab;
  const started=Date.now();
  while(Date.now()-started<45000){
    if(spawnError)throw spawnError;
    if(chrome.exitCode!==null)throw Error(`Chrome exited: ${stderr}`);
    try{
      const port=Number(readFileSync(join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]);
      assert.ok(Number.isInteger(port)&&port>0&&port<65536);
      const r=await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT',signal:AbortSignal.timeout(1000)});
      if(r.ok){tab=await r.json();break;}
    }catch{}
    await sleep(200);
  }
  assert.ok(tab?.webSocketDebuggerUrl,`Chrome DevTools required: ${stderr}`);
  socket=new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((ok,no)=>{const timer=setTimeout(()=>no(Error('Chrome WebSocket timeout')),10000);socket.addEventListener('open',()=>{clearTimeout(timer);ok();},{once:true});socket.addEventListener('error',e=>{clearTimeout(timer);no(e);},{once:true});});
  const send=(method,params={})=>new Promise((ok,no)=>{const id=++nextId;const timer=setTimeout(()=>{pending.delete(id);no(Error(`CDP timeout ${method}`));},20000);pending.set(id,{ok,no,timer});socket.send(JSON.stringify({id,method,params}));});
  socket.addEventListener('message',async e=>{try{const p=JSON.parse(e.data);if(p.id){const item=pending.get(p.id);if(!item)return;clearTimeout(item.timer);pending.delete(p.id);p.error?item.no(Error(p.error.message)):item.ok(p.result);}else if(p.method==='Fetch.requestPaused'){const safe=p.params.request.url.startsWith(origin+'/');await send(safe?'Fetch.continueRequest':'Fetch.failRequest',safe?{requestId:p.params.requestId}:{requestId:p.params.requestId,errorReason:'BlockedByClient'});}}catch(e){eventError=e;}});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,timeout:15000});assert.ok(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'http*://*'}]});
  for(const [lang,data] of Object.entries(copy))for(const width of [390,1440])for(const theme of ['light','dark']){
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
    const path=(lang==='zh-TW'?'':lang+'/')+'advanced-streaming.html';
    await send('Page.navigate',{url:origin+base+path+'?analytics=off'});
    for(let i=0;i<100;i++){if(await evaluate("document.readyState==='complete'&&!!document.querySelector('.advanced-streaming-benefits')"))break;await sleep(100);}
    await evaluate(`(async()=>{document.documentElement.dataset.theme=${JSON.stringify(theme)};await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()`);
    const info=await evaluate(`(()=>{const b=document.querySelector('.advanced-streaming-benefits'),d=document.querySelector('details.audio-route-details--installation'),nav=document.querySelector('#advanced-quick-start'),next=d.closest('[data-article-lead]').nextElementSibling;return{heading:b.querySelector('p').textContent,bullets:[...b.querySelectorAll('li')].map(x=>x.textContent.trim()),beforeTargets:!!(b.compareDocumentPosition(nav)&Node.DOCUMENT_POSITION_FOLLOWING),open:d.open,closedMargin:parseFloat(getComputedStyle(d).marginBottom),closedGap:next.getBoundingClientRect().top-d.getBoundingClientRect().bottom,scroll:document.documentElement.scrollWidth,viewport:innerWidth,overflowItems:[...b.querySelectorAll('li')].some(x=>x.scrollWidth>x.clientWidth+1)};})()`);
    writeFileSync(join(out,'last-observation.json'),JSON.stringify({lang,width,theme,...info},null,2));
    if(lang==='zh-TW'&&theme==='light'){
      await evaluate("document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)");
      const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});writeFileSync(join(out,`intro-${width}.png`),Buffer.from(shot.data,'base64'));
      await evaluate("document.querySelector('details.audio-route-details--installation').scrollIntoView({block:'center',behavior:'instant'})");
      await sleep(100);const gapShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});writeFileSync(join(out,`collapsed-${width}.png`),Buffer.from(gapShot.data,'base64'));
    }
    assert.equal(info.heading,data.intro);assert.deepEqual(info.bullets,data.intro_bullets);assert.ok(info.beforeTargets);assert.equal(info.open,false);assert.equal(info.closedMargin,24);assert.ok(info.closedGap>=23.5,`${path} collapsed gap ${info.closedGap}`);assert.ok(info.scroll<=width+1,`${path} horizontal overflow`);assert.equal(info.overflowItems,false);
    const opened=await evaluate("(async()=>{const d=document.querySelector('details.audio-route-details--installation');d.open=true;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const n=d.closest('[data-article-lead]').nextElementSibling;return{open:d.open,margin:parseFloat(getComputedStyle(d).marginBottom),gap:n.getBoundingClientRect().top-d.getBoundingClientRect().bottom};})()");
    assert.equal(opened.open,true);assert.equal(opened.margin,32);assert.ok(opened.gap>=31.5,`${path} expanded gap ${opened.gap}`);
    const result={lang,width,theme,bullets:3,closedGap:info.closedGap,openGap:opened.gap,noOverflow:true};results.push(result);console.log(JSON.stringify(result));
  }
  if(eventError)throw eventError;
  writeFileSync(join(out,'results.json'),JSON.stringify(results,null,2));
  console.log('Passed 20 browser layouts: five languages, mobile/desktop, light/dark, collapsed/expanded. All non-local page requests blocked.');
}catch(error){writeFileSync(join(out,'failure.txt'),String(error.stack||error)+'\n'+stderr);throw error;
}finally{
  if(socket)socket.close();for(const item of pending.values())clearTimeout(item.timer);
  chrome.kill('SIGTERM');await sleep(300);server.close();rmSync(profile,{recursive:true,force:true});
}
