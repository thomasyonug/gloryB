const uuid          = require('uuid/v4')
const classMeta     = require(load('config').path.decorators).classMeta
const RoomMeta      = require('./roomMeta')
const EventsEmitter = require('events')

module.exports = 
    @classMeta
    class RoomCore extends EventsEmitter{
        rooms = new Map();

        constructor () {
            super()
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
                        //抛出事件
                        this.trigger('join', room)
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
                        if (room.host === socket) {
                            const newHost = Array.from(room.guests)[0]
                            room.host = room.guests.size ? (room.delGuest(newHost), newHost) : null
                        } else {
                            room.delGuest(socket)
                        }
                        //抛出事件
                        this.trigger('quit', room)
                        room.shouldDestory() && this.destory(roomID)
                        socket.glory.room = null
                        resolve(room)
                    })
                } catch (err) {
                    rej(err)
                }
            })
        }

        query (roomID) {
            return this.rooms.get(roomID)
        }


        destory (roomID) {
            this.rooms.delete(roomID)
        }

        size () {
            return this.rooms.size
        }

        trigger (eventName, content) {
            this.emit(eventName, content)
        }
    }