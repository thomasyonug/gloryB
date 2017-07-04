const chalk = require('chalk')


module.exports = 
    function (packet, next) {
        console.log(chalk.blue('receive ---'), packet)
        return next()
    }