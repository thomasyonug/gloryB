const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')
module.exports = 
    @classMeta
    class RoomController extends Entity{
        room;

        constructor ({room}) {
            super()
            this.room = room
        }

        async join (content, socket) {
            const {
                roomID
            } = content
            try {
                const room = await this.room.join(roomID, socket)
                socket.to(room.roomID).$emit('room', {
                    type: 'roomInfo',
                    content: socket.glory.room.serialize()
                })
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
    }