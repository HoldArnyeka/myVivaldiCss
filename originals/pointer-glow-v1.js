/* Warm, pointer-following light for Vivaldi toolbar and bookmark buttons. */
(() => {
  "use strict";
  const key = "__obsidianPointerGlow";
  window[key]?.destroy();
  const selector = [
    "#browser .button-toolbar > button",
    "#browser button.button-toolbar",
    "#browser .ToolbarButton-Button",
    "#browser .bookmark-bar button",
    "#browser #switch button",
  ].join(",");
  const variables = ["--oa-pointer-x", "--oa-pointer-y", "--oa-light-dx", "--oa-light-dy"];
  const controller = new AbortController();
  const options = { capture: true, passive: true, signal: controller.signal };
  const style = document.createElement("style");
  style.id = "oa-pointer-glow-style";
  style.textContent = `
    #browser#browser [data-oa-pointer-glow] {
      background-image: radial-gradient(circle 32px at var(--oa-pointer-x) var(--oa-pointer-y),
        rgba(255, 193, 118, .31), rgba(233, 100, 58, .20) 38%,
        rgba(233, 100, 58, .05) 76%, transparent 100%) !important;
      box-shadow: inset 0 0 0 1px rgba(233, 100, 58, .15),
        var(--oa-light-dx) var(--oa-light-dy) 10px -3px rgba(246, 116, 0, .28) !important;
      transition: color 130ms ease, transform 130ms ease !important;
    }
    #oa-pointer-glow-ring {
      position: fixed; pointer-events: none !important; z-index: 2147483000;
      box-sizing: border-box; border: 1px solid rgba(255, 185, 104, .88);
      background: transparent; margin: 0; padding: 0;
      mask-image: radial-gradient(circle 24px at var(--oa-pointer-x) var(--oa-pointer-y),
        #000 0%, rgba(0, 0, 0, .8) 32%, transparent 100%);
    }
    #oa-pointer-glow-ring[hidden] { display: none !important; }
  `;
  const ring = document.createElement("div");
  ring.id = "oa-pointer-glow-ring";
  ring.hidden = true;
  ring.setAttribute("aria-hidden", "true");
  let active = null;
  let frame = 0;
  let pending = null;

  function findButton(node) {
    if (!(node instanceof Element)) return null;
    const direct = node.closest(selector);
    if (direct) return direct;
    // Disabled Back/Forward buttons may send pointer events to their wrapper.
    const wrapper = node.closest("#browser .toolbar-mainbar .button-toolbar");
    return wrapper?.querySelector(":scope > button") ?? null;
  }

  function release() {
    if (active) {
      active.removeAttribute("data-oa-pointer-glow");
      variables.forEach(name => active.style.removeProperty(name));
      active = null;
    }
    ring.hidden = true;
  }

  function clear() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    pending = null;
    release();
  }

  function draw() {
    frame = 0;
    const point = pending;
    pending = null;
    if (!point?.button.isConnected) return clear();
    const {button, clientX, clientY} = point;
    const rect = button.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0 || clientX < rect.left ||
        clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return clear();
    if (active !== button) {
      release();
      active = button;
    }
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    active.style.setProperty("--oa-pointer-x", `${x * 100}%`);
    active.style.setProperty("--oa-pointer-y", `${y * 100}%`);
    active.style.setProperty("--oa-light-dx", `${(x - .5) * 7}px`);
    active.style.setProperty("--oa-light-dy", `${(y - .5) * 7}px`);
    active.setAttribute("data-oa-pointer-glow", "");
    Object.assign(ring.style, {
      left: `${rect.left}px`, top: `${rect.top}px`,
      width: `${rect.width}px`, height: `${rect.height}px`,
      borderRadius: getComputedStyle(button).borderRadius,
    });
    ring.style.setProperty("--oa-pointer-x", `${x * 100}%`);
    ring.style.setProperty("--oa-pointer-y", `${y * 100}%`);
    ring.hidden = false;
  }

  function move(event) {
    if (event.pointerType === "touch") return clear();
    const button = findButton(event.target);
    if (!button) return clear();
    pending = {button, clientX: event.clientX, clientY: event.clientY};
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function attach() {
    document.head.append(style);
    document.body.append(ring);
    document.addEventListener("pointermove", move, options);
    document.addEventListener("pointerover", move, options);
    document.addEventListener("pointerout", event => {
      if (!event.relatedTarget || findButton(event.relatedTarget) !== active) clear();
    }, options);
    document.addEventListener("pointercancel", clear, options);
    document.addEventListener("visibilitychange", clear, options);
    document.addEventListener("scroll", clear, options);
    window.addEventListener("blur", clear, options);
    window.addEventListener("resize", clear, options);
  }

  window[key] = {
    version: "1.0.0",
    destroy() {
      controller.abort();
      clear();
      style.remove();
      ring.remove();
      delete window[key];
    },
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach, {once: true, signal: controller.signal});
  } else {
    attach();
  }
})();
