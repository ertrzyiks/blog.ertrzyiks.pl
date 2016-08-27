var SDC = require('statsd-client')
var slugify = require('slugify')

module.exports = function (options) {
  var host = options.host
  var prefix = options.prefix

  var sdc = new SDC({host: host})

  var statsdMiddleware = sdc.helpers.getExpressMiddleware(prefix, { timeByUrl: true })

  var requestKeyMiddleware = function (req, res, next) {
    if (req.path == '/') {
      res.locals.statsdUrlKey = req.method + '_' + 'root'
    } else {
      res.locals.statsdUrlKey = req.method + '_' + slugify(req.path, '_')
    }
    next()
  }
  return [requestKeyMiddleware, statsdMiddleware]
}
