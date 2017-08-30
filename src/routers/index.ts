import * as Router from "koa-router"
import {Context} from "koa"
import {userLib} from "../lib"
import * as jwt from "jsonwebtoken"

const expiresIn = 60 * 60

const router = new Router()

router.post('/login', async (ctx: Context, next: Function) =>{
    const match = await userLib.loginCheck(ctx.request.body)
    if (match) {
        const userInfo = await userLib.queryInfo(ctx.request.body)
        const token = jwt.sign(userInfo.toJSON(), , {expiresIn: expiresIn})

        ctx.body = {
            errcode: 0,
            token: token
        }

        ctx.session = token
        
    } else {
        try {
            ctx.throw(400, 'username or password not find')
        } catch (err) {
            ctx.body = err
        }
    }
})