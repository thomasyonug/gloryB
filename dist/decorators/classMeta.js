'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var log = load('log');
// const a = require('/src')
// import log from '/src/util'


module.exports = function (target, name, descriptor) {
    log('blue', target.name + '\u521D\u59CB\u5316\u6210\u529F');
    return function () {
        function _class(arg) {
            _classCallCheck(this, _class);

            target.call(this, arg);
        }

        return _class;
    }();
};