#!/bin/bash
set -e

apt-get -q -y --force-yes build-dep firefox

cp ../../data/buildscripts/mozconfig-common .mozconfig
cat ../../data/buildscripts/mozconfig-gnulinux >> .mozconfig

rm -rf obj-gnulinux

./mach build
./mach package

[ $(arch) = "x86_64" ] || exit 0
cd obj-gnulinux/browser/locales
for locale in $(ls ../../../l10n/ -1); do
    make langpack-$locale LOCALE_MERGEDIR=.
done


