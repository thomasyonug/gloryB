const httpEntry = require('./http')
const wsEntry = require('./ws')


describe('glory', function () {
    httpEntry()
    wsEntry()
})