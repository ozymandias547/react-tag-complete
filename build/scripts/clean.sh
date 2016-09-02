#!/usr/bin/env bash
shopt -s extglob	# enable file globbing

if [ -d "$dist"]; then
	mkdir -p dist
	cd $(pwd)/dist
	rm -rf !(.git|.openshift|Procfile)	# delete all but these files.
fi
