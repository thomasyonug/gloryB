import * as Koa from 'koa'
import * as net from 'net'
import IO = require('socket.io')
import 

export default class WebSocket {
    app: Koa;
    io: typeof IO;

    constructor({app, server}: {app: Koa, server: net.Server}){
        Object.assign(this, {
            io: new IO(server),
            app
        })
    }

    init () {
    }
}
