const path = require('path')
const fs = require('fs')

const INLINE_ASSETS = ['compiled']

var _assetHashes
var _cache = {}

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== '') {
  INLINE_ASSETS.forEach((name) => {
    const assetHashes = getAssetHashes()
    const hash = assetHashes[name]
    const filePath = path.resolve(__dirname, '../content/themes/nono/assets/css', name + '-' + hash + '.css')

    _cache[name] = fs.readFileSync(filePath).toString()
  })
}

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

function pathHelper(name) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
    return getWebpackDevServerAssetPath(name)
  }

  return getProductioAssetPath(name)
}

function linkHelper(name) {
  return `<link rel="stylesheet" type='text/css' href="${pathHelper(name)}"/>`
}

function inlineHelper(name) {
  if (!_cache[name]) {
    throw new Error(`Can't inline asset: ${name}`)
  }

  return _cache[name]
}

function hasInlineVersionHelper(name, options) {
  var fnTrue = options.fn,
      fnFalse = options.inverse;

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
    return fnFalse(this)
  }

  return name in _cache ? fnTrue(this) : fnFalse(this);
}

module.exports = {
  path: pathHelper,
  inline: inlineHelper,
  hasInlineVersion: hasInlineVersionHelper
}
