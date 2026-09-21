(() => {
  "use strict";
  const body = document.body;
  if (!body || body.dataset.downloadClickBound === "true") return;
  const config = body.dataset;
  const state = (value) => { config.downloadAnalyticsState = value; };
  const eligible = () => {
    const location = window.location, base = config.analyticsBasePath || "";
    if (location.protocol !== "https:" || !config.analyticsHost
      || location.hostname !== config.analyticsHost || !base.startsWith("/") || !base.endsWith("/")
      || (!location.pathname.startsWith(base) && location.pathname !== base.slice(0, -1))
      || navigator.webdriver) { state("excluded"); return false; }
    if ([navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack].some(v => v === "1" || v === "yes")
      || navigator.globalPrivacyControl === true
      || new URLSearchParams(location.search).get("analytics") === "off") {
      state("opted-out"); return false;
    }
    return true;
  };
  // Count only actual full-package links. Visiting resources/release notes is not a download click.
  const isPackage = (href) => {
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== "https://github.com" || url.username || url.password) return false;
      const parts = url.pathname.split("/");
      if (parts.length !== 7 || parts[1].toLowerCase() !== "noonisawesome"
        || parts[2].toLowerCase() !== "singing-stream-savior-updates" || parts[3] !== "releases") return false;
      if (!(parts[4] === "download" && parts[5]) && !(parts[4] === "latest" && parts[5] === "download")) return false;
      return /^Singing[ ._-]+Stream[ ._-]+Savior(?:[ ._-]+v?\d+(?:\.\d+){1,3})?\.zip$/i.test(decodeURIComponent(parts[6]));
    } catch { return false; }
  };
  try {
    if (config.analyticsProvider !== "counterapi-v2") { state("invalid-config"); return; }
    if (!config.downloadCounterEnabled || config.downloadCounterEnabled === "false") { state("disabled"); return; }
    const workspace = (config.counterWorkspace || "").trim(), counter = (config.downloadCounterName || "").trim();
    const slug = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
    if (config.downloadCounterEnabled !== "true" || !slug.test(workspace) || !slug.test(counter)
      || counter === (config.counterName || "").trim()) { state("invalid-config"); return; }
    if (!eligible()) return;
    if (typeof window.fetch !== "function" || typeof AbortController !== "function") { state("unsupported"); return; }
    const endpoint = `https://api.counterapi.dev/v2/${workspace}/${counter}/up`;
    const record = async () => {
      let timer;
      try {
        const controller = new AbortController();
        timer = window.setTimeout(() => controller.abort(), 5000);
        state("sending");
        const response = await window.fetch(endpoint, {
          method: "GET", mode: "cors", credentials: "omit", cache: "no-store", keepalive: true,
          referrerPolicy: "no-referrer", redirect: "error", signal: controller.signal,
        });
        if (!response.ok) { state("request-failed"); return; }
        const payload = await response.json(), data = payload?.data;
        if (![200, "200"].includes(payload?.code) || !Number.isSafeInteger(data?.up_count) || data.up_count < 0
          || !Number.isSafeInteger(data?.down_count) || data.down_count < 0 || data.down_count > data.up_count) {
          state("invalid-response"); return;
        }
        state("accepted"); // API acceptance is not a completed download or guaranteed persistence.
      } catch { state("request-failed"); } // Never retry an ambiguous increment.
      finally { if (timer !== undefined) window.clearTimeout(timer); }
    };
    const seen = new WeakSet();
    const onActivate = (event) => {
      try {
        if (!event.isTrusted || event.defaultPrevented || event.detail > 1 || seen.has(event)) return;
        if (!((event.type === "click" && event.button === 0) || (event.type === "auxclick" && event.button === 1))) return;
        const target = event.target?.nodeType === 3 ? event.target.parentElement : event.target;
        const link = target?.closest?.("a[href]");
        if (!link || link.getAttribute("aria-disabled") === "true" || !isPackage(link.href) || !eligible()) return;
        seen.add(event);
        void record(); // No preventDefault, await, redirect or delay in the download navigation.
      } catch { state("request-failed"); }
    };
    document.addEventListener("click", onActivate, { passive: true });
    document.addEventListener("auxclick", onActivate, { passive: true });
    config.downloadClickBound = "true";
    state("ready");
  } catch { state("request-failed"); }
})();
