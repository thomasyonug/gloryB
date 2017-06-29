const uuid      = require('uuid/v4')
const classMeta = require(load('config').path.decorators).classMeta
const roomMeta  = require('./roomMeta')


module.exports = 
    @classMeta
    class RoomCore {

        rooms = {};
        length = 0;
        constructor () {
            
        }


        create (content, socket) {
            return new Promise((resolve, rej) => {
                const roomID = uuid()
                try {
                    socket.join(roomID, () => {
                        this.rooms[roomID] = new roomMeta({roomID, socket})
                        this.length ++
                        resolve(this.rooms[roomID])
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
                        this.rooms[roomID].addGuest(socket)
                        resolve(this.rooms[roomID])
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
                        this.rooms[roomID].delGuest(socket)
                        
                        this.rooms[roomID].shouldDestory() && this.destory(roomID)

                        resolve(this.rooms[roomID])
                    })
                } catch (err) {
                    rej(err)
                }
            })
        }

        destory (roomID) {
            this.rooms[roomID] = null
            this.length --
        }


    }