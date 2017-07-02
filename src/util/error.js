const chalk = require('chalk')


module.exports = {
    promiseRejError (err) {
        log('red', err)
    },

    emitError (socket) {
        return err => {
            const res = {
                content: err,
                type: 'err'
            }
            console.log(chalk.red('error ---'), res)
            socket.$emit('err', res)
        }
    }
}