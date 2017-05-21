const Router = require('koa-better-router')
const router = Router().loadMethods()
const { userLib } = require('../lib')



router.post('/login', async (ctx, next) => {
    const match = await userLib.loginCheck(ctx.request.body)
    if ( match ) {
        ctx.body = {
            errcode: 0
        }
        ctx.session = ctx.request.body
    } else {
        try {
            ctx.throw(400, 'username or password not find')
        } catch ( err ){
            ctx.body = err
        }
    }
})



module.exports = router
