#!/usr/bin/env bash
set -euo pipefail

# Installs only the two reviewed UI files; existing custom CSS is untouched.
glow_source=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
glow_target='/opt/vivaldi/resources/vivaldi'
glow_original_hash='e1e8d71ea5d4c23b253a7e69a31acecc6807e3c153342c59886bb504c7619da1'
glow_patched_hash='f1101930b8a16c96fca5ec14edc1b889b17583199036ef6d4e16e760645ae668'
glow_previous_script_hash='a07ef99332172067d8fef849915c7594294a3e13d0f49d20245df1b20eaa745a'
glow_previous_script="$glow_source/originals/pointer-glow-v1.js"

if (( EUID != 0 )); then
    printf '%s\n' 'Administrator authorization is needed to update the Vivaldi UI files in /opt/vivaldi.' >&2
    exit 1
fi
if [[ -L "$glow_target/window.html" || -L "$glow_target/pointer-glow.js" ]]; then
    printf '%s\n' 'Unexpected symlink in the install targets; stopped without changes.' >&2
    exit 1
fi
glow_current_hash=$(sha256sum "$glow_target/window.html")
glow_current_hash=${glow_current_hash%% *}
if [[ "$glow_current_hash" != "$glow_original_hash" && "$glow_current_hash" != "$glow_patched_hash" ]]; then
    printf '%s\n' 'Vivaldi window.html has changed; inspect it before applying this loader.' >&2
    exit 1
fi
if [[ -e "$glow_target/pointer-glow.js" ]] && ! cmp -s "$glow_source/pointer-glow.js" "$glow_target/pointer-glow.js"; then
    glow_installed_hash=$(sha256sum "$glow_target/pointer-glow.js")
    glow_installed_hash=${glow_installed_hash%% *}
    if [[ "$glow_installed_hash" != "$glow_previous_script_hash" ]] || ! cmp -s "$glow_previous_script" "$glow_target/pointer-glow.js"; then
        printf '%s\n' 'An unrelated or edited pointer-glow.js already exists; preserve it and inspect first.' >&2
        exit 1
    fi
fi
install -m 644 "$glow_source/pointer-glow.js" "$glow_target/pointer-glow.js"
install -m 644 "$glow_source/window.pointer-glow.html" "$glow_target/window.html"
printf '%s\n' 'Installed the pointer-following glow. Restart Vivaldi to load it.'
