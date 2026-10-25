# Obsidian Aurora for Vivaldi

Warm orange accents, translucent browser toolbars, readable dark tabs, styled bookmark menus, and a pointer-following glow for buttons and tabs.

## Install the CSS

1. Download or clone this repository to a permanent folder.
2. Open `vivaldi://experiments`, enable **Allow CSS modifications**, and restart Vivaldi.
3. In Settings → Appearance, set **Custom UI Modifications** to this repository folder.
4. Fully quit and reopen Vivaldi.

`obsidian-aurora.css` styles the browser interface and includes the original
`bookmarkicon.css` rule that hides folder icons. No separate bookmark CSS file
is needed for that effect. `theme.json` records the matching theme settings; it is not an automatically installed theme package. Existing CSS mods can remain in your chosen custom CSS folder: copy `obsidian-aurora.css` there instead if needed.

The CSS and theme reference the original profile's moon wallpaper through a `chrome://vivaldi-data/thumbnail/` URL. The wallpaper itself is not included. On another profile, replace the two image URLs in the CSS with an accessible image URL and choose your background in Vivaldi's theme editor. Without that image, the dark background remains.

## Install the pointer glow (Linux)

From this repository directory, run:

```bash
pkexec /usr/bin/bash "$PWD/install-pointer-glow.sh"
```

Then fully quit and reopen Vivaldi. This installs the glow script and its loader under `/opt/vivaldi/resources/vivaldi`. The installer checks the loader checksum and refuses to overwrite an unfamiliar loader or script. It supports the reviewed loader from Vivaldi 8.2.4133.87; other versions require inspection first.

To disable only the glow:

```bash
pkexec /usr/bin/bash "$PWD/restore-pointer-glow.sh"
```

Restart Vivaldi afterward. The unused script is retained for recovery. To disable the CSS, remove this folder from Custom UI Modifications and restart.

Vivaldi updates can remove the glow loader modification. Reapply the installer only if its checks pass; inspect an updated loader before changing those checks.

See [pointer-glow details](POINTER-GLOW.md), [changenotes](CHANGELOG.md), and the local [interactive preview](pointer-glow-preview.html). Preview screenshots are in `previews/`.
