const config    = load('config')
const classMeta = require(config.path.decorators).classMeta
const Entity    = require('../entity')

const arrengement = require('./arrengement')
const glory       = require('./glory')
const transfer    = require('./transfer')


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
                ...arrengement,
                ...glory,
                ...transfer
            })
        }

        start (msg, socket) {
            const {
                room,
                userInfo
            } = socket.glory

            if ((room.host !== socket) || !room.guests.size) return


            //通知各方页面跳转
            this.io.to(room.roomID).emit('game', {
                type: 'start'
            })

            this.glory_initAll(msg, socket)

        }



    }