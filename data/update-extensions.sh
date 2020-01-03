#!/bin/bash

set -e

for extension in librejs https-everywhere librejs-usps-compatibility submit-me librifyjs-libgen-me tortm-browser-button viewtube disable-polymer-youtube; do

  rm -rf /tmp/update-extension
  mkdir /tmp/update-extension
  (cd /tmp/update-extension
   wget -O extension.xpi  https://addons.mozilla.org/firefox/downloads/latest/$extension/addon-$extension-latest.xpi
   unzip extension.xpi
   rm extension.xpi)

  if [ -f /tmp/update-extension/install.rdf ]; then
    ID=$(grep em:id /tmp/update-extension/install.rdf |sed 's/.*<em:id>//; s/<.*//' |head -n1)
  fi
  if [ -f /tmp/update-extension/manifest.json ]; then
    ID=$(grep '"id":' /tmp/update-extension/manifest.json |head -n1|cut -d \" -f 4)
  fi

  [ $extension = "tortm-browser-button" ] && ID="tortm-browser-button@jeremybenthum"
  [ $extension = "use-google-drive-with-librejs" ] && ID="google_drive@0xbeef.coffee"
  [ -z $ID ] && ID=$extension"@extension"

  rm -rf extensions/$ID
  mv /tmp/update-extension extensions/$ID

done

sed '/type=install/s=^=//=' -i extensions/tortm-browser-button@jeremybenthum/lib/common.js
sed '/autoUpdateRulesets/s/true/false/' -i extensions/https-everywhere@eff.org/pages/options/ux.js extensions/https-everywhere@eff.org/background-scripts/update.js

for ID in viewtube@extension disable-polymer-youtube@extension tortm-browser-button@jeremybenthum; do
  sed 's/^{/{\n  "applications": { "gecko": { "id": "'$ID'" } },/' -i extensions/$ID/manifest.json
done

find extensions -name cose.manifest -delete
find extensions -name cose.sig -delete
