const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const port = config.dev.port
const WebSocket = require(config.path.websocket)
const middlewares = require(config.path.middleware)
const api = require(config.path.api)
const public = require(config.path.public)





middlewares.forEach(middleware => {
    app.use(middleware)
    console.log(`loading middleware: ${middleware.name || 'nonameMiddleware'}`)
})

app.use(api.middleware())
app.use(public.middleware())








try{ 
    const server = app.listen(port)
    new WebSocket({app, server}).init()
    console.log(`listening on: ${port}`)
}catch(err){
    console.log(`boot error: ${err}`)
}
