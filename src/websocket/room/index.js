const RoomCore = require('./roomCore')
const OutsideCore = require('./outsideCore')
const classMeta = require(load('config').path.decorators).classMeta




module.exports = 
    @classMeta
    class Room{
        io;
        rooomCore;
        outsideCore
        constructor({io}){
            Object.assign(this, {
                io,
                roomCore: new RoomCore(),
                outsideCore: new OutsideCore()
            })
        }


        login (socket) {
            this.outsideCore.login(socket)
        } 

        join (roomID, socket) {
            console.log('join room')
        }

        create ({
            roomName
        }, socket) {
            console.log('create room')
        }

        quit (roomID, socket) {
            console.log('quit room')
        }

    }



