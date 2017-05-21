function checkSession (session) {
    return session instanceof Object && Object.keys(session).length
}



module.exports = async function loginFilter (ctx, next) {
    const path = ctx.request.path
    const protect = path.indexOf('/api') === 0
    if ( protect ) {
        if ( checkSession(ctx.session) ) await next()
        else {
            ctx.response.status = 401
        }
    } else {
        await next()
    }
}

