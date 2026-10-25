#!/usr/bin/env bash
set -euo pipefail
glow_source=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
glow_original="$glow_source/originals/window.html"
glow_target='/opt/vivaldi/resources/vivaldi/window.html'
glow_current_hash=$(sha256sum "$glow_target")
glow_current_hash=${glow_current_hash%% *}
if [[ "$glow_current_hash" != 'f1101930b8a16c96fca5ec14edc1b889b17583199036ef6d4e16e760645ae668' ]]; then
    printf '%s\n' 'The UI loader has since changed; inspect before restoring.' >&2
    exit 1
fi
install -m 644 "$glow_original" "$glow_target"
printf '%s\n' 'Original Vivaldi loader restored. Restart Vivaldi; the unused glow script is retained for recovery.'
