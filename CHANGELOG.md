# Changenotes

## 2026-10-25 — Hide bookmark folder icons

- Integrated the original `bookmarkicon.css` folder-icon hiding rule into Obsidian Aurora.
- Applied the same rule to the active local CSS and repository copy.
- Updated setup notes to remove the separate CSS dependency for this effect.

Validation: confirmed both CSS copies match and contain the original hiding rule; no visual browser check was run.

## 2026-10-25 — Initial repository release

- Added the existing Obsidian Aurora CSS: warm orange accents, glass toolbar surfaces, high-contrast active tabs, and bookmark-menu styling.
- Added the saved theme settings and documented the profile-specific moon background.
- Added pointer-glow 1.1.0 for toolbar, bookmark, and panel buttons, regular tabs, and pinned tabs.
- Included the interactive preview and saved screenshots.
- Made installation and restore scripts locate source files relative to their own directory, replacing the old fixed workspace path.
- Included the original loader and previous glow script needed for guarded installation and rollback.
- Documented CSS setup, administrator installation, restart requirements, update recovery, and removal.
- Kept browser profile preferences and account data out of this repository.

Validation: shell syntax checks, JSON parsing, and loader checksum/reference checks. The current glow and patched loader match the files restored locally on 2026-10-25. JavaScript syntax checking was unavailable because Node.js is not installed. No new visual browser test was run for this repository release.
