const path = require('path')
const fs = require('fs')

const INLINE_ASSETS = ['css/compiled']

var _assetHashes
var _cache = {}

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== '') {
  INLINE_ASSETS.forEach((name) => {
    const assetHashes = getAssetHashes()
    const hash = assetHashes[name]
    const filePath = path.resolve(__dirname, '../content/themes/nono/assets', name + '-' + hash + '.css')

    _cache[name] = fs.readFileSync(filePath).toString()
  })
}

function getAssetHashes() {
  _assetHashes = _assetHashes || {
      'css/compiled': getHash('css/compiled'),
      'css/fallback': getHash('css/fallback'),
      'js/lib/raven': getHash('js/lib/raven')
    }

  return _assetHashes
}

function getHash(name) {
  const hashFilePath = path.resolve(__dirname, '../content/themes/nono/assets', name + '.hash')
  const hash = fs.readFileSync(hashFilePath).toString().trim()

  return hash
}

function getProductionAssetPath(name) {
  const assetHashes = getAssetHashes()
  const hash = assetHashes[name]
  if (!hash) {
    throw new Error(`Can not find asset '${name}'.`)
  }

  const extension = name.indexOf('css/') == 0 ? 'css' : 'js'

  return `/assets/${name}-${hash}.${extension}`
}

function getWebpackDevServerAssetPath(name) {
  const cacheBuster = Math.random()
  const filename = name.split('/').pop()
  const extension = name.indexOf('css/') == 0 ? 'css' : 'js'
  return `/dev/assets/${filename}.${extension}?q=${cacheBuster}`
}

function pathHelper(name) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
    return getWebpackDevServerAssetPath(name)
  }

  return getProductionAssetPath(name)
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
