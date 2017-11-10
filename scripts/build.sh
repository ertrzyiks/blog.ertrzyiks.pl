#!/bin/sh

CSS_OUTPUT_DIR="$(pwd)/content/themes/nono/assets/css"
JS_OUTPUT_DIR="$(pwd)/content/themes/nono/assets/js/lib"
BUILD_DIR="$(pwd)/build/"

echo "$(pwd)/$CSS_OUTPUT_DIR"
mv_with_hash(){
  ASSET_FILE=./build/${1}.${2}
  HASH=`openssl sha1 $ASSET_FILE | awk '{print $2}'`
  echo ${HASH:0:7} > "$3/${1}.hash"
  mv $ASSET_FILE "$3/$1-${HASH:0:7}.${2}";
}

mv_fonts(){
  mkdir -p "$1/fonts"
  mv ./build/fonts/  "$1"
}

# Cleanup
rm ${BUILD_DIR}*
rm ${CSS_OUTPUT_DIR}/*
rm ${JS_OUTPUT_DIR}/*

# Compile
NODE_ENV=production webpack

# Move to the OUTPUT
mv_with_hash compiled css $CSS_OUTPUT_DIR
mv_with_hash fallback css $CSS_OUTPUT_DIR
mv_with_hash raven js $JS_OUTPUT_DIR
mv_fonts $CSS_OUTPUT_DIR

# Another cleanup
rm ${BUILD_DIR}*
rm ${BUILD_DIR}**/*

