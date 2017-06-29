const chalk = require('chalk')


module.exports = {
    promiseRejError (err) {
        log('red', err)
    },

    emitError (socket) {
        return err => {
            console.log(chalk.red('error ---'), err)
            socket.$emit('server error', err)
        }
    }
}