const classMeta = require(load('config').path.decorators).classMeta



module.exports = 
    @classMeta
    class OutsideCore {

        store = {};
        length = 0;
        constructor(){
        }


        login (socket) {
            const {
                store
            } = this

            const {
                id
            } = socket

            if (store[id]) {
                throw new Error(`this socket:${socket} already exist in outsideCore`)
                return false
            } else {
                try {
                    store[id] = socket
                    this.length ++
                    return true
                } catch (err) {
                    throw new Error(err)
                }
            }
        }

        logout (socket) {
            const {
                store
            } = this

            const {
                id
            } = socket

            if (store[id]) {
                try {
                    store[id] = null
                    this.length ++
                } catch (err) {
                    throw new Error(err)
                } 
            } else {
                throw new Error(`this socket:${socket} not found in outsideCore`)
            }
        }




    }

