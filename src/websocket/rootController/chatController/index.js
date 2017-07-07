const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')

module.exports = 
    @classMeta
    class ChatController extends Entity{
        io;
        room;
        game;

        constructor ({room, io, game}) {
            super()
            Object.assign(this, {
                room,
                game,
                io
            })
        }

        common (msg, socket) {
            const room = socket.glory.room
            this.io.to(room.roomID).emit('chat', {
                type: 'newMsg',
                content: {
                    text: msg,
                    from: socket.glory.userInfo.nickname
                }
            })
        }


    }