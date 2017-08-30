import * as uuid from "uuid/v4"
import * as EventsEmitter from "events"
// import * as SocketIo from "socket.io"
// import socketIo = require("socket.io")
// import { Socket } from "dgram";

import * as SocketIo from "socket.io"

class RoomCore extends EventsEmitter {
    rooms = new Map()
    
    constructor() {
        super()
    }

    create(content, socket) {
        return new Promise((resolve, reject) => {
            const roomId = uuid()
            try {
                socket.join(roomId, () => {
                    const roomMeta = new roomMeta({roomId, socket, content})
                    this.rooms.set(roomId, roomMeta)
                    socket.glory.room = roomMeta
                    return resolve(roomMeta)
                })
            } catch (err) {
                return reject(err)
            }
        })
    }
}