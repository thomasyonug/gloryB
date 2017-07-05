const Entity = require('../entity')
const emitError = load('error').emitError


module.exports = class MetaController extends Entity{
    room;
    game;
    io;


    constructor ({room, game, io}) {
        super()
        Object.assign(this, {
            room,
            game,
            io
        })  
    }


    async disconnect (msg, socket) {
        console.log(socket)
        if (socket.glory.room !== 'outside') {
            try {
                await this.room.quit(socket.glory.room.roomID, socket)
                return this.room.outsideCore.quit(socket)
            } catch (err) {
                emitError(socket)(err)
            }
        } else {
            return this.room.outsideCore.quit(socket)
        }
    }

}