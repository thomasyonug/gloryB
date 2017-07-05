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
        if (socket.glory.room !== 'outside') {
            try {
                await this.room.quit(socket.glory.room.roomID, socket)
                return this.room.outsideCore.quit(socket).then(() => {
                    console.log('roomCore', this.room.roomCore.size())
                    console.log('outsideCore', this.room.outsideCore.size())
                })
            } catch (err) {
                emitError(socket)(err)
            }
        } else {
            return this.room.outsideCore.quit(socket).then(() => {
                console.log('roomCore', this.room.roomCore.size())
                console.log('outsideCore', this.room.outsideCore.size())
            })
        }


    }

}