import { Context } from "koa"

function checkSession(session: Object) {
    return Object.keys(session).length
}

export = async function loginFilter(ctx: Context, next: Function) {
    const { path } = ctx.request
    const protect = path.indexOf('/api') === 0
    if (protect) {
        if (checkSession(ctx.session)) {
            await next()
        }
    } else {
        await next()
    }
}