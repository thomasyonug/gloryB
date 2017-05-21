const Router = require('koa-better-router')
const router = Router().loadMethods()
const { userLib } = require('../lib')


router.post('/test', async (ctx, next) => {
})



module.exports = router