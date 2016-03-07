require('dotenv').load();

var express = require('express'),
    ghost = require('ghost'),
    path = require('path'),

    app = express();

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    app.use(ghostServer.rootApp);
    ghostServer.start(app);
});
