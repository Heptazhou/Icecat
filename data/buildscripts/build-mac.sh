#!/bin/bash
set -e

export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

apt-get -q -y --force-yes  install zip unzip yasm

rm -rf obj-macos

cp ../../data/buildscripts/mozconfig-macos .mozconfig

./mach build 2>&1 |tee mach-macos-build.log

./mach package 2>&1 |tee mach-macos-package.log

