#!/bin/sh

set -ex
# build
npm run build
# go to dist folder
cd dist
# switch to gh-pages branch
git checkout gh-pages
git add .
git commit -m "gh-pages build"
git push
# return to main folder
cd ..
