require('dotenv').load();

var express = require('express'),
    ghost = require('ghost'),
    path = require('path'),

    app = express(),
    tommyAssets = require('./content/apps/my-ghost-tommy/middleware')

var gatherStats = function () {
    return require('./middlewares/statsd')({
        host: process.env.STATSD_HOST || '127.0.0.1',
        prefix: process.env.STATSD_PREFIX || 'blog-ertrzyiks-pl'
    })
}

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {

    if (process.env.NODE_ENV === 'production') {
      app.use(gatherStats())
    }

    app.use('/assets/', tommyAssets)
    app.use(ghostServer.rootApp)

    ghostServer.start(app)
}).catch(function (err) {
    console.error(err)
    process.exit(1)
})
