const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')
module.exports = 
    @classMeta
    class RoomController extends Entity{
        room;
        io;

        constructor ({room, io}) {
            super()
            Object.assign(this, {
                room,
                io
            })
            this.roomChangeHandle(room.roomCore)
        }

        async join (content, socket) {
            const {
                roomID
            } = content
            try {
                const room = await this.room.join(roomID, socket)
            } catch(err) {
                console.log(err)
            }
        }


        async create (content, socket) {
            const {room} = await this.room.create(content, socket)
        }

        quit (content, socket) {
            const {
                roomID
            } = content

            this.room.quit(roomID, socket)
        }


        async roomList (content, socket) {
            socket.$emit('room', {
                type: 'roomList',
                content: this.room.roomList() 
            })
        }

        roomInfo (content, socket) {
            socket.$emit('room', {
                type: 'roomInfo',
                content: socket.glory.room.serialize()
            })
        }



        roomChangeHandle (roomCore) {
            const handle = room => {
                this.io.to(room.roomID).emit('room', {
                    type: 'roomInfo',
                    content: room.serialize()
                })
            }

            roomCore.on('join', handle)
            roomCore.on('quit', handle)
        }
    }