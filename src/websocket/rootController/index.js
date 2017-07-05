const classMeta = require(load('config').path.decorators).classMeta
const RoomController = require('./roomController')
const GameController = require('./gameController')
const MetaController = require('./MetaController')


module.exports = 
    @classMeta
    class RootController{
        io;
        room;
        game;
        wsClass;
        gameCtrler;
        roomCtrler;

        constructor({io, room, game, wsClass}){
            Object.assign(this, {
                io, 
                room, 
                game, 
                wsClass,
                gameCtrler: new GameController({game}),
                roomCtrler: new RoomController({room}),
                metaCtrler: new MetaController({room, game, io})
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

    }