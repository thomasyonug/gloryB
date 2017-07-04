const chalk = require('chalk')



module.exports = (socket, next) => {
    console.log(chalk.green('connect ---'), socket.id)
    return next()
}