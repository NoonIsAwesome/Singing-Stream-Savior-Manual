import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../assets/js/download-mirror.js", import.meta.url), "utf8");
const initial = Date.parse("2027-01-04T00:00:00Z");
const expiry = "2027-01-05T00:00:00+09:00";
function browser({ dates = [expiry], now = initial } = {}) {
  let currentTime = now;
  const documentListeners = {}, windowListeners = {};
  const wrappers = dates.map(value => ({
    hidden: false,
    getAttribute(name) { return name === "data-download-mirror-expires" ? value : null; },
    querySelector() { return link; },
  }));
  const wrapper = wrappers[0];
  const link = {
    href: "https://57.gigafile.nu/0105-o91b142bdcfa3da79b0abc49b8830fcdb",
    closest(selector) { return selector === "[data-download-mirror-expires]" ? wrapper : null; },
  };
  const document = {
    querySelectorAll(selector) { assert.equal(selector, "[data-download-mirror-expires]"); return wrappers; },
    addEventListener(type, listener, capture) {
      assert.equal(capture, true);
      (documentListeners[type] ||= []).push(listener);
    },
  };
  const window = { addEventListener(type, listener) { (windowListeners[type] ||= []).push(listener); } };
  class ClockDate extends Date { static now() { return currentTime; } }
  const context = { document, window, Date: ClockDate };
  runInNewContext(source, context);
  const activate = ({ type = "click", button = 0, isTrusted = true, anchor = link } = {}) => {
    const event = { type, button, isTrusted, defaultPrevented: false, prevented: false, stopped: false,
      target: { closest: selector => selector === "a[href]" ? anchor : null },
      preventDefault() { this.prevented = true; this.defaultPrevented = true; },
      stopImmediatePropagation() { this.stopped = true; },
    };
    for (const listener of documentListeners[type] || []) listener(event);
    return event;
  };
  const pageshow = () => { for (const listener of windowListeners.pageshow || []) listener(); };
  return { wrappers, wrapper, link, activate, pageshow, setNow(value) { currentTime = value; } };
}

test("valid ISO expiry remains visible before its instant", () => {
  const page = browser();
  assert.equal(page.wrapper.hidden, false);
});
test("invalid or impossible dates hide the mirror at initialization", () => {
  const page = browser({ dates: ["not-a-date", "2027-02-30T00:00:00+09:00", "2027-01-05T00:00:00"] });
  assert.deepEqual(page.wrappers.map(item => item.hidden), [true, true, true]);
});
test("expiry boundary is inclusive", () => {
  const page = browser({ now: Date.parse(expiry) });
  assert.equal(page.wrapper.hidden, true);
});
test("pageshow hides a mirror after its expiry while leaving no other wrapper state", () => {
  const page = browser();
  assert.equal(page.wrapper.hidden, false);
  page.setNow(Date.parse(expiry));
  page.pageshow();
  assert.equal(page.wrapper.hidden, true);
});
test("trusted activation at expiry prevents navigation and downstream counting", () => {
  const page = browser();
  page.setNow(Date.parse(expiry));
  const event = page.activate();
  assert.equal(page.wrapper.hidden, true);
  assert.equal(event.prevented, true);
  assert.equal(event.stopped, true);
});
test("valid activation and untrusted events are not intercepted", () => {
  const page = browser();
  const untrusted = page.activate({ isTrusted: false });
  const valid = page.activate();
  assert.equal(untrusted.prevented, false);
  assert.equal(valid.prevented, false);
  assert.equal(page.wrapper.hidden, false);
});
test("GitHub links outside the mirror wrapper remain untouched", () => {
  const page = browser({ now: Date.parse(expiry) });
  const githubLink = { href: "https://github.com/example/release.zip", closest: () => null };
  const event = page.activate({ anchor: githubLink });
  assert.equal(event.prevented, false);
  assert.equal(event.stopped, false);
});
test("middle activation is blocked after expiry", () => {
  const page = browser();
  page.setNow(Date.parse(expiry));
  const event = page.activate({ type: "auxclick", button: 1 });
  assert.equal(event.prevented, true);
  assert.equal(event.stopped, true);
});