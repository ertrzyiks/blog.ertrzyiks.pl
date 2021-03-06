require('dotenv').load();

var express = require('express'),
    ghost = require('ghost'),
    path = require('path'),
    helpers = require('./helpers'),
    Raven = require('raven'),

    app = express(),
    tommyAssets = require('./content/apps/my-ghost-tommy/middleware')

Raven.config(process.env.SENTRY_DSN, {
    environment: process.env.NODE_ENV
}).install()

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
    app.use(Raven.requestHandler())

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === '') {
        app.use(useWebpackDevServer())
    }

    app.use('/', express.static(__dirname + '/content/favicon/'))
    app.use('/assets/', tommyAssets)
    app.use(ghostServer.rootApp)
    app.use(Raven.errorHandler())

    ghostServer.start(app)
}).catch(function (err) {
    console.error(err)
    process.exit(1)
})
