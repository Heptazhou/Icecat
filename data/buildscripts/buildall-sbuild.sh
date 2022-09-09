#!/bin/bash

# This script expects a Trisquel sbuild environment, such as the one provided by https://gitlab.trisquel.org/trisquel/trisquel-builder/-/blob/master/sbuild-create.sh

set -e
set -x

if [ $# != 1 ]; then
  echo E: pass the source dir as parameter
  exit 1
fi

SRCDIR=$(readlink -f $1)
VERSION=$(echo $1|sed 's|.*icecat-||')
ROOTDIR=$(readlink -f $SRCDIR/../../)
BUILDDIR=/var/lib/sbuild/build/
BUILDDIST=nabia

sudo rm -rf /var/lib/sbuild/build/gnuzilla
cp -a $ROOTDIR $BUILDDIR/gnuzilla


function buildpackage(){
cat << EOF > $BUILDDIR/run.sh
set -e
set -x

apt update
apt-get build-dep -y --force-yes firefox 

apt-get install -y --force-yes mercurial python-setuptools
cd /usr/local/src
hg clone http://hg.mozilla.org/l10n/compare-locales/
cd compare-locales/
hg checkout RELEASE_3_3_0
python2 setup.py install
cp /usr/local/bin/compare* /usr/bin

cd /build/gnuzilla/output/icecat-$VERSION

bash ../../data/buildscripts/build-${1}.sh
bash
rm /build/run.sh

EOF

env -i sudo schroot --directory / -c $BUILDDIST-$3 -- bash  /build/run.sh
}

#buildpackage windows $BUILDDIST amd64 |tee  windows.log 2>&1
#buildpackage mac $BUILDDIST amd64 |tee mac.log 2>&1
#buildpackage gnulinux $BUILDDIST i386 |tee gnulinux-i386.log 2>&1
#sudo mv $SRCDIR/obj-gnulinux $SRCDIR/obj-gnulinux-i386
buildpackage gnulinux $BUILDDIST amd64 |tee gnulinux-amd64.log 2>&1
sudo mv $SRCDIR/obj-gnulinux $SRCDIR/obj-gnulinux-amd64
#buildpackage android $BUILDDIST amd64  |tee android.log 2>&1

rm binaries -rf
mkdir binaries/langpacks -p
#cp $1/obj-windows/dist/icecat*.zip binaries
#cp $1/obj-mac/dist/icecat/icecat*.dmg binaries
cp $1/obj-gnulinux*/dist/icecat*.bz2 binaries
#cp $1/obj-android/dist/icecat*.apk binaries
cp $1/obj-gnulinux-amd64/dist/linux-x86_64/xpi/* binaries/langpacks
rename 's/linux/gnulinux/' binaries/*
