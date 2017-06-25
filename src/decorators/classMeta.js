const path = require('path')
const log = load('log')



module.exports = (target, name, descriptor) => {
    return class extends target{
        constructor(...arg){
            super(...arg)
            log('cyan', `[[    ${target.name}   ]] ready`)
        }
    }
}