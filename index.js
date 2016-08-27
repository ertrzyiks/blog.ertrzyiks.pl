require('dotenv').load();

var express = require('express'),
    ghost = require('ghost'),
    path = require('path'),

    app = express();

var gatherStats = function () {
    return require('./middlewares/statsd')({
        host: process.env.STATSD_HOST || '46.101.162.17',
        prefix: process.env.STATSD_PREFIX || 'blog-ertrzyiks-pl'
    })
}

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {

    []
      .concat((process.env.NODE_ENV === 'production') ? [gatherStats()] : [])
      .concat([ghostServer.rootApp])
      .map(function (middleware) {
          app.use(middleware)
      })

    ghostServer.start(app);
});
