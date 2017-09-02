import * as Koa from 'koa'
import Util from './util'
import router from './routers'
import WebSocket from './websocket'


const port = Util.config.dev.port







const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())


try {
    const server = app.listen(port)
    new WebSocket({app, server}).init()
    console.log(`listening on: ${port}`)
} catch (err) {
    console.log(`boot error: ${err}`)
}





