(() => {
  "use strict";
  const body = document.body;
  if (!body) return;
  // A page-scoped latch, not a visitor ID. Never retry an ambiguous increment.
  if (body.dataset.counterAttempted === "true") return;
  const run = async () => {
    let timer;
    try {
      const config = body.dataset;
      if (config.analyticsProvider !== "counterapi-v2"
        || !["true", "false"].includes(config.counterEnabled)) {
        config.analyticsState = "invalid-config"; return;
      }
      if (config.counterEnabled !== "true") {
        config.analyticsState = "disabled"; return;
      }
      const workspace = (config.counterWorkspace || "").trim();
      const counter = (config.counterName || "").trim();
      if (!workspace || !counter) { config.analyticsState = "not-configured"; return; }
      const slug = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
      if (!slug.test(workspace) || !slug.test(counter)) {
        config.analyticsState = "invalid-config"; return;
      }
      const location = window.location;
      const basePath = config.analyticsBasePath || "";
      if (location.protocol !== "https:" || !config.analyticsHost
        || location.hostname !== config.analyticsHost
        || !basePath.startsWith("/") || !basePath.endsWith("/")
        || (!location.pathname.startsWith(basePath)
          && location.pathname !== basePath.slice(0, -1))
        || navigator.webdriver) {
        config.analyticsState = "excluded"; return;
      }
      const dnt = [navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack];
      if (dnt.some((value) => value === "1" || value === "yes")
        || navigator.globalPrivacyControl === true
        || new URLSearchParams(location.search).get("analytics") === "off") {
        config.analyticsState = "opted-out"; return;
      }
      if (typeof window.fetch !== "function" || typeof AbortController !== "function") {
        config.analyticsState = "unsupported"; return;
      }
      const controller = new AbortController();
      config.counterAttempted = "true";
      config.analyticsState = "sending";
      timer = window.setTimeout(() => controller.abort(), 5000);
      const endpoint = `https://api.counterapi.dev/v2/${encodeURIComponent(workspace)}/${encodeURIComponent(counter)}/up`;
      const response = await window.fetch(endpoint, {
        method: "GET", mode: "cors", credentials: "omit", cache: "no-store",
        referrerPolicy: "no-referrer", redirect: "error", keepalive: true,
        signal: controller.signal,
      });
      if (!response.ok) {
        config.analyticsState = [401, 403].includes(response.status) ? "authentication-required"
          : response.status === 404 ? "not-found"
          : response.status === 429 ? "rate-limited" : "request-failed";
        return;
      }
      const payload = await response.json();
      const data = payload?.data;
      if (![200, "200"].includes(payload?.code)
        || !Number.isSafeInteger(data?.up_count) || data.up_count < 0
        || !Number.isSafeInteger(data?.down_count) || data.down_count < 0
        || data.down_count > data.up_count) {
        config.analyticsState = "invalid-response"; return;
      }
      // V2 buffers writes. Accepted does not prove persistence or unique people.
      config.analyticsState = "accepted";
    } catch {
      // A network/CORS/timeout failure may occur AFTER an increment. No fallback.
      body.dataset.analyticsState = "request-failed";
    } finally {
      if (timer !== undefined) window.clearTimeout(timer);
    }
  };
  return run();
})();
