const errorMiddleware = require('./error')
const parserMiddleware = require('./parser')
const sessionMiddleware = require('./session')
const loginFilterMiddleware = require('./loginFilter')

module.exports = [
    errorMiddleware,
    parserMiddleware,
    // sessionMiddleware,
    loginFilterMiddleware
]