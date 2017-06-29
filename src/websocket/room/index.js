const RoomCore    = require('./roomCore')
const OutsideCore = require('./outsideCore')
const classMeta   = require(load('config').path.decorators).classMeta
const emitError   = load('error').emitError


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


        connect (socket) {
            this.outsideCore.join(socket)
        } 

        join (roomID, socket) {
            return this.roomCore.join(roomID, socket).then(room => {
                this.outsideCore.quit(socket)
                return room
            })
        }

        create (content, socket) {
            return this.roomCore.create(content, socket)
                .then(room => {
                    return this.outsideCore.quit(socket)
                })
                .then(socket => {
                    console.log(socket.id)
                })
                .catch(emitError(socket))
        }

        quit (roomID, socket) {
            this.roomCore.quit(roomID, socket).then(room => {
                this.outsideCore.join(socket)
            })
        }

    }



