require('babel-polyfill')
require('./util')
const Koa = require('koa')
const app = new Koa()
const port = load('config').dev.port
const WebSocket = require('./websocket')
const middlewares = require('./middleware')
const api = require('./api')
const publicApi = require('./public')
const log       = load('log')





middlewares.forEach(middleware => {
    app.use(middleware)
    log('blue', `loading middleware: ${middleware.name || 'nonameMiddleware'}`)
})

app.use(api.middleware())
app.use(publicApi.middleware())








try{ 
    const server = app.listen(port)
    new WebSocket({app, server}).init()
    console.log(`listening on: ${port}`)
}catch(err){
    console.log(`boot error: ${err}`)
}
