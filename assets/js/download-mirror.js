(() => {
  "use strict";
  const selector = "[data-download-mirror-expires]";
  const expiryTime = (value) => {
    if (typeof value !== "string") return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(value);
    if (!match) return null;
    const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
    const hour = Number(match[4]), minute = Number(match[5]), second = Number(match[6]);
    const millis = Number((match[7] || "").padEnd(3, "0"));
    const zoneHour = Number(match[10] || 0), zoneMinute = Number(match[11] || 0);
    if (month < 1 || month > 12 || day < 1 || hour > 23 || minute > 59 || second > 59
      || zoneHour > 14 || zoneMinute > 59 || (zoneHour === 14 && zoneMinute !== 0)) return null;
    const calendar = new Date(Date.UTC(year, month - 1, day, hour, minute, second, millis));
    if (calendar.getUTCFullYear() !== year || calendar.getUTCMonth() !== month - 1
      || calendar.getUTCDate() !== day || calendar.getUTCHours() !== hour
      || calendar.getUTCMinutes() !== minute || calendar.getUTCSeconds() !== second
      || calendar.getUTCMilliseconds() !== millis) return null;
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) ? timestamp : null;
  };
  const hideIfExpired = (wrapper) => {
    const expires = expiryTime(wrapper.getAttribute("data-download-mirror-expires"));
    if (expires === null || expires <= Date.now()) {
      wrapper.hidden = true;
      return true;
    }
    return false;
  };
  const refresh = () => {
    document.querySelectorAll(selector).forEach(hideIfExpired);
  };
  const onActivate = (event) => {
    if (!event.isTrusted || event.defaultPrevented
      || !((event.type === "click" && event.button === 0)
        || (event.type === "auxclick" && event.button === 1))) return;
    const target = event.target?.nodeType === 3 ? event.target.parentElement : event.target;
    const link = target?.closest?.("a[href]");
    const wrapper = link?.closest?.(selector);
    if (wrapper && hideIfExpired(wrapper)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  refresh();
  window.addEventListener("pageshow", refresh);
  document.addEventListener("click", onActivate, true);
  document.addEventListener("auxclick", onActivate, true);
})();