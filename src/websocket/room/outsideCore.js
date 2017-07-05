const classMeta = require(load('config').path.decorators).classMeta



module.exports = 
    @classMeta
    class OutsideCore {

        store = {};
        length = 0;
        constructor(){
        }


        join (socket) {
            const {
                store
            } = this

            const {
                id
            } = socket

            return new Promise((resolve, rej) => {
                if (store[id]) { rej(`this socket:${socket} already exist in outsideCore`) }
                try {
                    socket.join('outside', () => {
                        store[id] = socket
                        socket.glory.room = 'outside'
                        this.length ++
                        resolve(socket)
                    })
                } catch (err) {
                    rej(err)
                }
            })
        }

        quit (socket) {
            const {
                store
            } = this

            const {
                id
            } = socket

            return new Promise((resolve, rej) => {
                if (!store[id]) { rej (`this socket:${socket.id} not found in outsideCore`) }
                try {
                    socket.leave('outside', () => {
                        store[id] = null
                        socket.glory.room = null
                        this.length --
                        resolve(socket)
                    })
                } catch(err) {
                    rej(err)
                }
            })

        }




    }

