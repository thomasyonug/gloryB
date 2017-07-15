const helper = require('./helper')
const log    = require('./log')
const config = require('./config')
const error  = require('./error')
require('./ArrayExtend')
require('./SetExtend')



const store = {
    helper,
    log,
    config,
    error
}

global.load = field => {
    return store[field]
}

