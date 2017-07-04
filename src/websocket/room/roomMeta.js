
module.exports = class roomMeta {
    roomName = null;
    host = null;
    guests = [];
    roomID = null;
    constructor ({roomID, socket, content}) {
        Object.assign(this, {
            roomName: content.roomName,
            host: socket,
            guests: [],
            roomID
        })
        console.log(this.roomName)
    }


    addGuest (socket) {
        this.guests.push(socket)
    }
    
    delGuest (socket) {
        const index = this.guests.indexOf(socket)
        if (index > -1) {
            this.guests.splice(index, 1)
        } else if (this.host === socket) {
            this.host = null
        }
    }

    serialize () {
        return {
            ...this,
            host: this.host.id,
            guests: this.guests.map(guest => guest.socket.id)
        }
    }


    shouldDestory () {
        if (this.host === null && this.guests.length === 0) { return true }
        else { return false }
    }
}