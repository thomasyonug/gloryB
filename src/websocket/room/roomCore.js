const uuid      = require('uuid/v4')
const classMeta = require(load('config').path.decorators).classMeta
const RoomMeta  = require('./roomMeta')


module.exports = 
    @classMeta
    class RoomCore {
        rooms = new Map();

        constructor () {
            
        }


        create (content, socket) {
            return new Promise((resolve, rej) => {
                const roomID = uuid()
                try {
                    socket.join(roomID, () => {
                        const roomMeta = new RoomMeta({roomID, socket, content})
                        this.rooms.set(roomID, roomMeta)
                        socket.glory.room = roomMeta
                        resolve(roomMeta)
                    })
                } catch (err) {
                    rej(err)
                }

            })
        }

        join (roomID, socket) {
            return new Promise((resolve, rej) => {
                try {
                    socket.join(roomID, () => {
                        const room = this.rooms.get(roomID)
                        room.addGuest(socket)
                        socket.glory.room = room
                        resolve(room)
                    })
                } catch (err) {
                    rej(err)
                }
            })
        }




        quit (roomID, socket) {
            return new Promise((resolve, rej) => {
                try {
                    socket.leave(roomID, () => {
                        const room = this.rooms.get(roomID)
                        room.delGuest(socket)
                        socket.glory.room = null
                        room.shouldDestory() && this.destory(roomID)
                        resolve(room)
                    })
                } catch (err) {
                    rej(err)
                }
            })
        }

        destory (roomID) {
            this.rooms.delete(roomID)
        }

        size () {
            return this.rooms.size
        }

    }