const classMeta = require(load('config').path.decorators).classMeta
const RoomController = require('./roomController')
const GameController = require('./gameController')
const MetaController = require('./metaController')
const ChatController = require('./chatController')

module.exports = 
    @classMeta
    class RootController{
        io;
        room;
        game;
        wsClass;
        gameCtrler;
        roomCtrler;
        chatCtrler;
        constructor({io, room, game, wsClass}){
            Object.assign(this, {
                io, 
                room, 
                game, 
                wsClass,
                gameCtrler: new GameController({game, io}),
                roomCtrler: new RoomController({room, io}),
                metaCtrler: new MetaController({room, game, io}),
                chatCtrler: new ChatController({room, io, game})
            })
        } 



        connect (socket) {
            this.room.connect(socket)
        }



        roomController (msg, socket) {
            this.roomCtrler.on(msg, socket)
        }

        gameController (msg, socket) {
            this.gameCtrler.on(msg, socket)
        }

        metaController (msg, socket) {
            this.metaCtrler.on(msg, socket)
        }

        chatController (msg, socket) {
            this.chatCtrler.on(msg, socket)
        }
    }