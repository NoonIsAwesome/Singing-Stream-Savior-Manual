(() => {
  "use strict";

  // Website-only, optional analytics. Never identify a person or use site storage.
  // A public site token enables the vendor beacon, not access to its dashboard.
  const body = document.body;
  if (!body) return;

  try {
    const config = body.dataset;
    const token = (config.cloudflareToken || "").trim();
    if (config.analyticsProvider !== "cloudflare" || !token) {
      body.dataset.analyticsState = "not-configured";
      return;
    }
    if (!/^[a-f0-9]{32}$/i.test(token)) {
      body.dataset.analyticsState = "invalid-config";
      return;
    }

    const location = window.location;
    const basePath = config.analyticsBasePath || "";
    if (location.protocol !== "https:" || !config.analyticsHost
      || location.hostname !== config.analyticsHost
      || !basePath.startsWith("/") || !basePath.endsWith("/")
      || (!location.pathname.startsWith(basePath)
        && location.pathname !== basePath.slice(0, -1))
      || navigator.webdriver) {
      body.dataset.analyticsState = "excluded";
      return;
    }

    // Respect privacy preferences, and offer a URL-only opt-out for manual checks.
    // No cookie/localStorage flag, fingerprint, IP hash, or persistent visitor ID.
    const dnt = [navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack];
    if (dnt.some((value) => value === "1" || value === "yes")
      || navigator.globalPrivacyControl === true
      || new URLSearchParams(location.search).get("analytics") === "off") {
      body.dataset.analyticsState = "opted-out";
      return;
    }

    if (document.querySelector("script[data-cf-beacon]")) return;
    const beacon = document.createElement("script");
    beacon.id = "s3s-cloudflare-beacon";
    beacon.type = "text/javascript";
    beacon.crossOrigin = "anonymous";
    beacon.async = true;
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    // This is a multi-page Jekyll site. Chapter hash/history changes are not views.
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token, spa: false }));
    beacon.addEventListener("load", () => {
      // Loading the script does NOT prove successful ingestion by Cloudflare.
      body.dataset.analyticsState = "beacon-loaded";
    }, { once: true });
    beacon.addEventListener("error", () => {
      body.dataset.analyticsState = "load-failed";
    }, { once: true });
    body.dataset.analyticsState = "loading";
    body.appendChild(beacon);
  } catch {
    // Blockers, unavailable APIs, or analytics failures must not break the manual.
    body.dataset.analyticsState = "load-failed";
  }
})();
