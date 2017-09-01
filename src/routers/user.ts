import {Context} from "koa"
import * as Router from "koa-router"
import * as jwt from "jsonwebtoken"
import {userLib} from '../lib'
import Util from '../util'

const expiresIn = 60 * 60


export default function (router: Router) {

    router.post('/login', async (ctx: Context, next: () => Promise<any>) => {
        const match = await userLib.loginCheck(ctx.request.body)
        if (match) {
            const userInfo = await userLib.queryInfo(ctx.request.body)
            const token = jwt.sign(userInfo.toJSON(), Util.config.jwtPrivateKey, { expiresIn })
            ctx.body = {
                errcode: 0,
                token
            }
        } else {
            try {
                ctx.throw(400, 'username or password not find')
            } catch (err) {
                ctx.body = err
            }
        }
    })     
}
