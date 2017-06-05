const hbs = require('express-hbs')

function register() {
  hbs.registerHelper('thumbnail', require('./cloudinary_thumbnail'))
  hbs.registerHelper('nono_asset_path', require('./nono_asset').path)
  hbs.registerHelper('nono_asset_inline', require('./nono_asset').inline)
  hbs.registerHelper('nono_has_inline_asset', require('./nono_asset').hasInlineVersion)
}

module.exports = {
  register: register
}
