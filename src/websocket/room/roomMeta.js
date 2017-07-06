
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
        this.guests.delete(socket)
    }

    serialize () {
        return {
            ...this,
            host: this.host && this.host.glory.userInfo.nickname,
            guests: Array.from(this.guests).map(guest => guest.glory.userInfo.nickname)
        }
    }


    shouldDestory () {
        if (this.host === null && this.guests.size === 0) { return true }
        else { return false }
    }
}