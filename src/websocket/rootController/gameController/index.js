const config    = load('config')
const classMeta = require(config.path.decorators).classMeta
const Entity    = require('../entity')
const arrengement = require('./arrengement')

module.exports = 
    @classMeta
    class GameController extends Entity{
        game;
        io;

        constructor ({game, io}) {
            super()
            Object.assign(this, {
                game,
                io,
                ...arrengement
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




        transfer (msg, socket) {
            const {
                room
            } = socket.glory
        }



    }