const chalk = require('chalk')

let _emit = null

const $emit = function (...ev) {
    console.log(chalk.green('send ---', ...ev))
    return _emit.call(this, ...ev)
}

module.exports = [
    function connectInfo (socket, next) {
        console.log(chalk.green('connect ---'), socket.id)
        return next()
    }
    ,
    function socketDecorator (socket, next) {
        if (_emit === null) _emit = socket.emit

        socket.$emit = $emit

        return next()
    }
]