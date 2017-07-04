const classMeta = require(load('config').path.decorators).classMeta

module.exports = 
    @classMeta
    class RoomController {
        room;

        constructor ({room}) {
            this.room = room
        }



        on ({type = null, content = null} = {}, socket) {
            const handler = this[type]
            if (!handler) { 
                throw new Error('room msg.type can\'t be empty')
                return false
            } else {
                handler.call(this, content, socket)
            }
        }


        async join (content, socket) {
            const {
                roomID
            } = content

            this.room.join(roomID, socket)
        }


        async create (content, socket) {
            const {room} = await this.room.create(content, socket)

            socket.$emit('room', {
                type: 'joinRoom',
                content: room.serialize()
            })
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
    }