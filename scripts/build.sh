#!/bin/sh

OUTPUT_DIR="$(pwd)/content/themes/nono/assets/css/"
BUILD_DIR="$(pwd)/build/"

echo "$(pwd)/$OUTPUT_DIR"
mv_with_hash(){
  CSS_FILE=./build/${1}.css
  HASH=`openssl sha1 $CSS_FILE | awk '{print $2}'`
  echo ${HASH:0:7} > "$2/${1}.hash"
  mv $CSS_FILE "$2/$1-${HASH:0:7}.css";
}


# Cleanup
rm ${BUILD_DIR}*
rm ${OUTPUT_DIR}*

# Compile
webpack

# Move to the OUTPUT
mv_with_hash compiled $OUTPUT_DIR
mv_with_hash fallback $OUTPUT_DIR

# Another cleanup
rm ${BUILD_DIR}*

