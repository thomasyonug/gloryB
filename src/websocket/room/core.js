const uuid = require('uuid/v4')

function setSocketRoomID (socket, roomID) {
    socket.adapter._room = roomID
}

module.exports = class RoomCore {
    constructor () {
        this.store = {}
        this.outside = {}
        this.storeLength = 0
        this.outsideLength = 0
    }

    
    create (name, socket) {
        const id = uuid()
        this.store[id] = {
            name,
            host: socket.id,
            guests: [],
            id
        }
        setSocketRoomID(socket, id)
        this.storeLength++
    }

    join (roomID, socket) {
        socket.join(roomID)
        this.store[roomID].guests.push(socket.id)
        setSocketRoomID(socket, roomID)
    }

    joinOutside (socket) {
        socket.join('outside')
        this.outside[socket.id] = socket.id
        setSocketRoomID(socket, 'outside')
        this.outsideLength++
    }
    leaveOutside (socket) {
        socket.leave('outside')
        this.outside[socket.id] = undefined
        this.outsideLength--
    }

    leave (socket) {
        if (socket.adapter._room === 'outside') return
        const room = this.store[socket.adapter._room]
        const index = room.guests.findIndex(guest => guest === socket.id)
        //减少客人
        room.guests.splice(index, 1)
        //判断是否销毁房间
        if (room.guests.length < 2) { this.store[socket.adapter._room] = undefined }
    }

    
    offline (socket) {
        this.leaveOutside(socket)
        this.leave(socket)
    }



    getAsArray () {
        return Object.keys(this.store).map(name => this.store[name]).filter(item => item)
    }
    getAsObject () {
        return this.store
    }


}

 

