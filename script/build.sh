#! /bin/bash
# You Need Add Permission：chmod +x script/build.sh

build() {
  mkdir -p build/contentScripts
  mkdir -p build/backgroundScripts
  cp -r src/contentScripts/* build/contentScripts
  cp -r src/backgroundScripts/* build/backgroundScripts
  echo "Finish..."
}

build