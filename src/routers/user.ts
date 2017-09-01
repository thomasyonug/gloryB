import {Context} from "koa"
import * as Router from "koa-router"
import * as jwt from "jsonwebtoken"

const expiresIn = 60 * 60

export default function (router: Router) {

    router.post('/login', async (ctx: Context, next: () => Promise<any>) => {
        ctx.body = 'fuck u'
    })
    
    router.get('/login', async (ctx: Context, next: () => Promise<any>) => {
        ctx.body = 'fuck u'
    })
}
