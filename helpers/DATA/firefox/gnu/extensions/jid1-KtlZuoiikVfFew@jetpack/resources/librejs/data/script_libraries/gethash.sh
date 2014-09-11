#!/usr/bin/env bash
#
# gethash.sh
#
# Get the hash of a js file for use in the librejs database.
#

FILE=$1
wget -O /tmp/jsfile $FILE
iconv -f LATIN1 -t UTF8 /tmp/jsfile | sha1sum
