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


        join (content, socket) {
            const {
                roomID
            } = content

            this.room.join(roomID, socket)
        }


        create (content, socket) {
            this.room.create(content, socket)
        }

        quit (content, socket) {
            const {
                roomID
            } = content

            this.room.quit(roomID, socket)
        }


    }