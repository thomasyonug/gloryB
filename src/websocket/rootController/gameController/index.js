const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')

module.exports = 
    @classMeta
    class GameController extends Entity{
        game;
        io;

        constructor ({game, io}) {
            super()
            Object.assign(this, {
                game,
                io
            })
        }

        start (msg, socket) {
            const {
                room,
                userInfo
            } = socket.glory
            
            if (room.host !== socket) return

            this.io.to(room.roomID).emit('game', {
                type: 'start'
            })
        }


    }