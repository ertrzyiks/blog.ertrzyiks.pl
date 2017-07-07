require('dotenv').load();

var express = require('express'),
    ghost = require('ghost'),
    path = require('path'),
    helpers = require('./helpers')

    app = express(),
    tommyAssets = require('./content/apps/my-ghost-tommy/middleware')

var gatherStats = function () {
    return require('./middlewares/statsd')({
        host: process.env.STATSD_HOST || '127.0.0.1',
        prefix: process.env.STATSD_PREFIX || 'blog-ertrzyiks-pl'
    })
}

var useWebpackDevServer = function () {
    var webpackDevMiddleware = require("webpack-dev-middleware")
    var webpack = require("webpack")
    var webpackConfig = require("./webpack.config")
    var compiler = webpack(webpackConfig)

    return webpackDevMiddleware(compiler, {
        publicPath: '/dev/assets'
    })
}

helpers.register()

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {

    if (process.env.NODE_ENV === 'production') {
      app.use(gatherStats())
    }

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
        app.use(useWebpackDevServer())
    }

    app.use('/', express.static(__dirname + '/content/favicon/'))
    app.use('/assets/', tommyAssets)
    app.use(ghostServer.rootApp)

    ghostServer.start(app)
}).catch(function (err) {
    console.error(err)
    process.exit(1)
})
