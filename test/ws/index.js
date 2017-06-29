var io = require('socket.io-client')
, assert = require('assert')


module.exports = () => {
    describe('webSocket', function () {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    })
}