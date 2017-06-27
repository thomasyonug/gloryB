const classMeta = require(load('config').path.decorators).classMeta
const RoomController = require('./roomController')
const GameController = require('./gameController')


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
                roomCtrler: new RoomController({room})
            })
        } 



        connect (socket) {
            this.room.login(socket)
        }


        roomController (msg, socket) {
            this.roomCtrler.on(msg, socket)
        }

        gameController (msg, socket) {
            this.gameCtrler.on(msg, socket)
        }

        

    }