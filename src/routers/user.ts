import * as Router from "koa-router"
import * as jwt from "jsonwebtoken"
import {userLib} from '../lib'
import Util from '../util'

const expiresIn = 60 * 60


export default function (router: Router) {

    router.post('/public/login', async (ctx, next) => {
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

    router.post('/register', async (ctx, next) => {
        const exist = await userLib.loginCheck({
            username: ctx.request.body.username
        })
        console.log(`exist: ${exist}`)

        if (exist) {
            try {
                ctx.body = {
                    errcode: 1,
                    errDetail: 'this user already exist!',
                    success: false
                }
            } catch (err) {
                ctx.body = err
            }
        } else {
        }


    })
}
