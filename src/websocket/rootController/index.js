const decoratorsPath = load('config').path.decorators
const classMeta = require(decoratorsPath).classMeta
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
                gameCtrler: new GameController(),
                roomCtrler: new RoomController()
            })
        } 



        connect (socket) {
            this.room.loginCustomer(socket)
        }


        roomController (msg) {
            this.gameCtrler.on(msg)
        }

        gameController (msg) {
            this.roomCtrler.on(msg)
        }

        

    }