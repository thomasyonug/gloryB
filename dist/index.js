'use strict';

require('babel-polyfill');
require('./util');
var Koa = require('koa');
var app = new Koa();
var config = require('./config');
var port = config.dev.port;
var WebSocket = require('./websocket');
var middlewares = require('./middleware');
var api = require('./api');
var publicApi = require('./public');

middlewares.forEach(function (middleware) {
    app.use(middleware);
    console.log('loading middleware: ' + (middleware.name || 'nonameMiddleware'));
});

app.use(api.middleware());
app.use(publicApi.middleware());

try {
    var server = app.listen(port);
    new WebSocket({ app: app, server: server }).init();
    console.log('listening on: ' + port);
} catch (err) {
    console.log('boot error: ' + err);
}