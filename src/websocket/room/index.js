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
        allSocketStore;

        constructor({io}){
            Object.assign(this, {
                io,
                roomCore: new RoomCore(),
                outsideCore: new OutsideCore(),
                allSocketStore: new Map()
            })
        }


        connect (socket) {
            this.outsideCore.join(socket)
            this.allSocketStore.set(socket.glory.userInfo.username, socket)
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

        queryRoomByID (roomID) {
            return this.roomCore.query(roomID)
        }

        roomList (content, socket) {
            const res = []
            const rooms = this.roomCore.rooms

            for (let [key,value] of rooms) {
                res.push(value.serialize())
            }
            
            return res
        }

    }



