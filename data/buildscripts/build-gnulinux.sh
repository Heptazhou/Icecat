#!/bin/bash
set -e
set -x

wget https://deb.nodesource.com/setup_16.x -O /tmp/nodesource_setup.sh
sed '/toutatis/s|precise|focal|;s/toutatis/nabia/' -i /tmp/nodesource_setup.sh
bash /tmp/nodesource_setup.sh

apt-get update
apt install nodejs
aptitude -q -y  build-dep firefox
cargo install cbindgen --version 0.23.0

ln -s /usr/lib/llvm*/bin/clang /bin/clang -f
ln -s /usr/lib/llvm*/bin/clang++ /bin/clang++ -f

cp ../../data/buildscripts/mozconfig-common .mozconfig
cat ../../data/buildscripts/mozconfig-gnulinux >> .mozconfig

rm -rf obj-gnulinux

./mach build
./mach package

[ $(arch) = "x86_64" ] || exit 0
cd obj-gnulinux/browser/locales
for locale in $(ls ../../../l10n/ -1); do
    rm $PWD/mergedir -rf
    make merge-$locale LOCALE_MERGEDIR=$PWD/mergedir
    make langpack-$locale LOCALE_MERGEDIR=$PWD/mergedir
done


