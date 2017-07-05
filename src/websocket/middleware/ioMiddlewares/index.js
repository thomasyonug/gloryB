const connectInfo = require('./connectInfo')
const decorate    = require('./decorate')
const context     = require('./context')

module.exports = [
    decorate,
    connectInfo,
    context
]