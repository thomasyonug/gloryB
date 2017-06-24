const RoomStore = require('./roomCoreClass')
const classMeta = require(load('config').path.decorators).classMeta




module.exports = 
    @classMeta
    class Room{
        constructor({io, socket}){
            this.io = io
            this.roomStore = new RoomStore()
        }
        init () {
            this.io.on('connection', (socket) => {
                this.roomStore.joinOutside(socket)


                // socket.on('room', msg => )

                // socket.on('createRoom', msg => this.createRoomHandle(socket, msg))
                // socket.on('getRooms', msg => this.getRoomsHandle(socket, msg))
                // socket.on('joinRoom', msg => this.joinRoomHandle(socket, msg))
                // socket.on('leaveRoom', msg => this.leaveRoomHandle(socket, msg))

                // //native event
                // socket.on('disconnect', msg => this.disconnectHandle(socket, msg))
            })
        }


        createRoomHandle (socket, msg) {
            const {name} = msg
            this.roomStore.create(name, socket)
            this.joinRoomHandle(socket, {
                roomID: socket.adapter._room
            })
        }

        getRoomsHandle (socket, msg) {
            socket.emit('getRooms', this.roomStore.getAsArray())
        }

        joinRoomHandle (socket, msg) {
            const {roomID} = msg
            this.roomStore.join(roomID, socket)
            this.io.to(roomID).emit('joinRoom', this.roomStore.store[roomID])
        }

        leaveRoomHandle (socket, msg) {
            const roomID = socket.adapter._room
            this.roomStore.leave(socket)
            this.io.to(roomID).emit('joinRoom', this.roomStore.store[roomID])
        }


        disconnectHandle (socket, msg) {
            this.roomStore.offline(socket)
        }





















        updateRoomAllMember (roomID) {
        }


        
    }



