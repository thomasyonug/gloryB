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

router.post('/register', async(ctx, next) => {
   
    const exist = await userLib.loginCheck({ 
        username: ctx.request.body.username
    })
   console.log("exist: " + exist)
    if( exist ) {
        try {
            ctx.body = {
                errcode: 1,
                errDetail: "this user already exist!",
                success: false
            }
        } catch ( err ){
            ctx.body = err
        }
    } else {
        const suc =  await userLib.createNewUser(ctx.request.body)

        if ( suc ) {
            ctx.body = {
                errcode: 0,
                success: true
            }
        } else {
            try {
                ctx.body = {
                    errcode: 1,
                    errDetail: "can't create new user!",
                    success: false
                }
            } catch (err) {
                ctx.body = err
            }
        }        

    }
   
})


module.exports = router
