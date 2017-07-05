const classMeta = require(load('config').path.decorators).classMeta



module.exports = 
    @classMeta
    class OutsideCore {

        store = new Map();
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
                if (store.has(id)) { rej(`this socket:${socket} already exist in outsideCore`) }
                try {
                    socket.join('outside', () => {
                        store.set(id, socket)
                        socket.glory.room = 'outside'
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
                if (!store.has(id)) { rej (`this socket:${socket.id} not found in outsideCore`) }
                try {
                    socket.leave('outside', () => {
                        store.delete(id)
                        socket.glory.room = null
                        resolve(socket)
                    })
                } catch(err) {
                    rej(err)
                }
            })

        }

        size () {
            return this.store.size
        }


    }

