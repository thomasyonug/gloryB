const Room = require('./room')


module.exports = class {
    constructor({app, server}){
        const io = require('socket.io')(server)
        this.app = app
        this.room = new Room(io)
    }

    init () {
        this.room.init()



        console.log('websocket inited')
    }
}