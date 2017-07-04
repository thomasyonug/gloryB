const RoomCore    = require('./roomCore')
const OutsideCore = require('./outsideCore')
const classMeta   = require(load('config').path.decorators).classMeta
const emitError   = load('error').emitError


module.exports = 
    @classMeta
    class Room{
        io;
        roomCore;
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
                    return {
                        socket: this.outsideCore.quit(socket),
                        room
                    }
                })
                .catch(emitError(socket))
        }

        quit (roomID, socket) {
            this.roomCore.quit(roomID, socket).then(room => {
                this.outsideCore.join(socket)
            })
        }

        roomList (content, socket) {
            const res = []
            const rooms = this.roomCore.rooms

            for (let key in rooms) {
                res.push(rooms[key].serialize())
            }
            
            return res
        }

    }



