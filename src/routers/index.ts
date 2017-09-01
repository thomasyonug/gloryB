import * as Router from "koa-router"
import user from './user'



const router = new Router()

user(router)

export default router





