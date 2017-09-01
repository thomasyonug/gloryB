import * as Koa from 'koa'
import Util from './util'
import router from './routers'


const port = Util.config.dev.port







const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())



app.listen(port)

