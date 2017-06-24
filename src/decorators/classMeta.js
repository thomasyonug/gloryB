const path = require('path')
const log = load('log')



module.exports = (target, name, descriptor) => {
    return class {
        constructor(arg){
            log('cyan', `[[    ${target.name}   ]] ready`)
            new (target.bind(this, arg))
        }
    }
}