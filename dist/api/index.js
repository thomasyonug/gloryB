'use strict';

var user = require('./user');
var Router = require('koa-better-router');

module.exports = Router({
    prefix: '/api'
}).extend(user);