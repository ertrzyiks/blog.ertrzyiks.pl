const express = require('express')
const app = express()

app
  .use('/my-ghost-tommy', express.static(__dirname + '/assets/'))

module.exports = app
