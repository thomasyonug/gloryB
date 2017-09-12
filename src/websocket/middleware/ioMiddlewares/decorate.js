const chalk = require('chalk')
let _emit = null

const $emit = function (...ev) {
    console.log(chalk.green('send ---', ...ev))
    console.log(...ev)
    return _emit.call(this, ...ev)
}

module.exports = (socket, next) => {
    if (_emit === null) _emit = socket.emit

    socket.$emit = $emit

    return next()
}