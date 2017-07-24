
module.exports = class Entity {
    constructor(){
    }


    on ({type = null, content = null} = {}, socket) {
        const handler = this[type]
        if (!handler) { 
            throw new Error(`${type} handler can\'t be empty`)
            return false
        } else {
            handler.call(this, content, socket)
        }
    }
}