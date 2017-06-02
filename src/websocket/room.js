const helper = require('../util').helper






module.exports = class {
    constructor(io){
        this.io = io
        this.rooms = {}
        this.outside = [] 
    }
    init () {
        this.io.on('connection', (socket) => {
            this.outside.push(socket)
            socket.join('outside')


            socket.on('createRoom', msg => this.createRoomHandle(socket, msg))
            socket.on('getRooms', msg => this.getRoomsHandle(socket, msg))
            socket.on('joinRoom', msg => this.joinRoomHandle(socket, msg))
        })
    }


    createRoomHandle (socket, msg) {
        const {
            name
        } = msg
        this.rooms[socket.id] = {
            host: socket.id,
            guest: [],
            name
        }
        
        this.io.to('outside').emit('getRooms', this.rooms)
    }

    getRoomsHandle (socket, msg) {
        socket.emit('getRooms', this.rooms)
    }

    joinRoomHandle (socket, msg) {
        const {
            roomID
        } = msg

        socket.join(roomID, () => {
            this.updateRoomAllMember(roomID)
        })
    }

























    updateRoomAllMember (roomID) {
        this.io.to(room, this.rooms[roomID])
    }


    
}



