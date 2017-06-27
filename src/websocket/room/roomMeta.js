
module.exports = class roomMeta {
    roomName = null;
    host = null;
    guests = [];
    constructor ({roomName, socket}) {
        Object.assign(this, {
            roomName,
            host: socket,
            guests: []
        })
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


    shouldDestory () {
        if (this.host === null && this.guests.length === 0) { return true }
        else { return false }
    }
}