const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const port = config.dev.port

const middlewares = require(config.path.middleware)
const api = require(config.path.api)
const public = require(config.path.public)
// app.use()


middlewares.forEach(middleware => {
    app.use(middleware)
    console.log(`loading middleware: ${middleware.name || 'nonameMiddleware'}`)
})

app.use(api.middleware())
app.use(public.middleware())


try{ 
    app.listen(port)
    console.log(`listening on: ${port}`)
}catch(err){
    console.log(`boot error: ${err}`)
}
