const helper = require('./helper')
const log    = require('./log')
const config = require('./config')
const store = {
    helper,
    log,
    config
}

global.load = field => {
    return store[field]
}

