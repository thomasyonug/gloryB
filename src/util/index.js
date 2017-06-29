const helper = require('./helper')
const log    = require('./log')
const config = require('./config')
const error    = require('./error')
const store = {
    helper,
    log,
    config,
    error
}

global.load = field => {
    return store[field]
}

