import {green} from "chalk"
import * as koa from "koa"

export default function (socket: Object, next: any) {
    console.log(green("connect ----"), socket.id)
    return next()
}