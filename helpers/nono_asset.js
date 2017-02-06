const path = require('path')
const fs = require('fs')

var _assetHashes

function getAssetHashes() {
  _assetHashes = _assetHashes || {
    compiled: getHash('compiled'),
    fallback: getHash('fallback')
  }

  return _assetHashes
}

function getHash(name) {
  const hashFilePath = path.resolve(__dirname, '../content/themes/nono/assets/css', name + '.hash')
  const hash = fs.readFileSync(hashFilePath).toString().trim()

  return hash
}

function getProductioAssetPath(name) {
  const assetHashes = getAssetHashes()
  const hash = assetHashes[name]
  if (!hash) {
    throw new Error(`Can not find asset '${name}'.`)
  }

  return `/assets/css/${name}-${hash}.css`
}

function getWebpackDevServerAssetPath(name) {
  const cacheBuster = Math.random()
  return `/dev/assets/${name}.css?q=${cacheBuster}`
}

module.exports = function (name) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
    return getWebpackDevServerAssetPath(name)
  }

  return getProductioAssetPath(name)
}
