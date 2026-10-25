# Pointer-following glow

Effect version: **1.1.0**. Original button effect confirmed working on 2026-10-19; the saved version also supports tabs.

`pointer-glow.js` tracks the pointer over toolbar, bookmark, panel buttons, and tabs. A warm radial highlight and bright rim follow its position. Tabs use a wider light, while pinned tabs use a smaller light. The overlay ignores clicks and retains active-tab styling.

The effect updates on pointer events through `requestAnimationFrame`, with no continuous animation loop. Leaving a target, scrolling, resizing, losing focus, and beginning a tab drag clear the effect. It styles browser controls, not websites.

## Files

- `pointer-glow.js`: current effect.
- `window.pointer-glow.html`: reviewed loader with one added deferred script tag.
- `originals/window.html`: original loader used by the restore script.
- `originals/pointer-glow-v1.js`: previous button-only script, used to validate an upgrade.
- `pointer-glow-preview.html`: interactive demonstration.
- `previews/`: saved button and tab examples.

The scripts resolve their source files relative to their own location. Administrator authentication is required to update `/opt/vivaldi/resources/vivaldi`. The effect applies across profiles using that Vivaldi installation. CSS settings and browser preferences are not modified by these scripts.

See [installation and removal](README.md). The restore script disables the glow; the install script restores the effect after an update when the loader matches.

## Validation history

The original local preview checks covered pointer tracking, rendered gradients, click-through overlays, hover cleanup, script cleanup, tab styling, close-button hit testing, pinned tabs, and clearing the effect during a tab drag. These are historical checks, not a guarantee of compatibility with future Vivaldi versions.
