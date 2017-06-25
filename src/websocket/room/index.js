const RoomCore = require('./core')
const classMeta = require(load('config').path.decorators).classMeta




module.exports = 
    @classMeta
    class Room{
        io;
        socket;
        core;
        constructor({io, socket}){
            Object.assign(this, {
                io,
                socket,
                roomCore: new RoomCore()
            })
        }


        loginCustomer (socket) {
            this.roomCore.login(socket)
        } 
    }



