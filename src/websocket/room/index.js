const RoomCore = require('./roomCore')
const OutsideCore = require('./outsideCore')
const classMeta = require(load('config').path.decorators).classMeta




module.exports = 
    @classMeta
    class Room{
        io;
        rooomCore;
        outsideCore;
        constructor({io}){
            Object.assign(this, {
                io,
                roomCore: new RoomCore(),
                outsideCore: new OutsideCore()
            })
        }


        login (socket) {
            this.outsideCore.join(socket)
        } 

        join (roomID, socket) {
            return this.roomCore.join(roomID, socket).then(room => {
                this.outsideCore.quit(socket)
                return room
            })
        }

        create ({
            roomName
        }, socket) {
            return this.roomCore.create({roomName}, socket)
        }

        quit (roomID, socket) {
            this.roomCore.quit(roomID, socket)
            this.outsideCore.join(socket)
        }

    }



