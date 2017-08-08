const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')
const emitError = load('error').emitError
module.exports = 
    @classMeta
    class RoomController extends Entity{
        room;
        io;

        constructor ({room, io}) {
            super()
            Object.assign(this, {
                room,
                io
            })
            this.roomChangeHandle(room.roomCore)
        }

        async join (content, socket) {
            const {
                roomID
            } = content
            try {
                const room = await this.room.join(roomID, socket)
            } catch(err) {
                console.log(err)
            }
        }


        async create (content, socket) {
            const {room} = await this.room.create(content, socket)
        }

        async quit (content, socket) {
            const {
                roomID
            } = content

            await this.room.quit(roomID, socket)

            socket.$emit('meta', {
                type: 'quitRoomSuccess'
            })

        }


        async roomList (content, socket) {
            try {
                socket.$emit('room', {
                    type: 'roomList',
                    content: this.room.roomList() 
                })
            } catch (err) {
                emitError(socket)(err)
            }
        }

        roomInfo (content, socket) {
            try {
                socket.$emit('room', {
                    type: 'roomInfo',
                    content: socket.glory.room.serialize()
                })
            } catch (err) {
                emitError(socket)(err)
            }
        }

        hostInfo (content, socket) {
            try {
                socket.$emit('room', {
                    type: 'hostInfo',
                    content: socket.glory.userInfo.nickname
                })
            } catch (err) {
                emitError(socket)(err)
            }
        }


        roomChangeHandle (roomCore) {
            const handle = room => {
                try {
                    this.io.to(room.roomID).emit('room', {
                        type: 'roomInfo',
                        content: room.serialize()
                    })
                } catch (err) {
                    this.io.to(room.roomID).emit('err', {
                        type: 'err',
                        content: err
                    })
                }
            }

            roomCore.on('join', handle)
            roomCore.on('quit', handle)
        }
    }