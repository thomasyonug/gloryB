const Router = require('koa-better-router')
const router = Router().loadMethods()
const { userLib } = require('../lib')
const jwt = require('jsonwebtoken')


router.post('/login', async (ctx, next) => {
    const match = await userLib.loginCheck(ctx.request.body)
    if ( match ) {
        const userInfo = await userLib.queryInfo(ctx.request.body)
        const token = jwt.sign(userInfo.toJSON(), 'fuck u', {expiresIn: 60 * 60})

        
        ctx.body = {
            errcode: 0,
            token: token
        }

        ctx.session = token
    } else {
        try {
            ctx.throw(400, 'username or password not find')
        } catch ( err ){
            ctx.body = err
        }
    }
})



module.exports = router
