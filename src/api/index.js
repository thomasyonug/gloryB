const user = require('./user')
const Router = require('koa-better-router')


module.exports = Router({
    prefix: '/api'
}).extend(user)