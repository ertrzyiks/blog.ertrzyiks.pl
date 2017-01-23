const hbs = require('express-hbs')

function register() {
  hbs.registerHelper('thumbnail', require('./cloudinary_thumbnail'))
  hbs.registerHelper('nono_asset', require('./nono_asset'))
}

module.exports = {
  register: register
}
