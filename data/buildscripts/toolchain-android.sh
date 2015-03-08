#!/bin/bash
#https://wiki.mozilla.org/Mobile/Fennec/Android/Detailed_build_instructions#Linux
set -e

apt-get -q -y --force-yes install openjdk-7-jdk ant mercurial ccache
apt-get -q -y --force-yes build-dep firefox

WD=android-build
rm -rf $WD
mkdir $WD
cd $WD

wget https://dl.google.com/android/ndk/android-ndk-r8e-linux-x86.tar.bz2
tar -xjf android-ndk-r8e-linux-x86.tar.bz2

wget http://dl.google.com/android/android-sdk_r24.0.2-linux.tgz
tar -xzf android-sdk_r24.0.2-linux.tgz

while true; do echo y; sleep 1; done |./android-sdk-linux/tools/android update sdk -u
while true; do echo y; sleep 1; done |./android-sdk-linux/tools/android update adb

echo export PATH=$PATH:$PWD/android-sdk-linux/tools:$PWD/android-sdk-linux/build-tools:$PWD/android-sdk-linux/platform-tools
export PATH=$PATH:$PWD/android-sdk-linux/tools:$PWD/android-sdk-linux/build-tools:$PWD/android-sdk-linux/platform-tools

pkill adb

echo DONE
