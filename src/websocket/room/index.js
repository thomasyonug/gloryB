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
            return this.outsideCore.quit(socket).then(() => {
                return this.roomCore.join(roomID, socket)
            })
        }

        async create (content, socket) {
            try {
                await this.outsideCore.quit(socket)
                const room = await this.roomCore.create(content, socket)
                return {
                    room,
                    socket
                }
            } catch (err) {
                emitError(socket)(err)
            }
        }

        quit (roomID, socket) {
            return this.roomCore.quit(roomID, socket).then(room => {
                return this.outsideCore.join(socket)
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



