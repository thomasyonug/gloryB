
module.exports = class roomMeta {
    roomName = null;
    host = null;
    guests = new Set();
    roomID = null;
    constructor ({roomID, socket, content}) {
        Object.assign(this, {
            roomName: content.roomName,
            host: socket,
            roomID
        })
    }


    addGuest (socket) {
        this.guests.add(socket)
    }
    
    delGuest (socket) {
        // const index = this.guests.indexOf(socket)
        // if (index > -1) {
        //     this.guests.splice(index, 1)
        // } else if (this.host === socket) {
        //     this.host = null
        // }
        this.guests.delete(socket)
    }

    serialize () {
        return {
            ...this,
            host: this.host && this.host.id,
            guests: Array.from(this.guests).map(guest => guest.id)
        }
    }


    shouldDestory () {
        if (this.host === null && this.guests.size === 0) { return true }
        else { return false }
    }
}