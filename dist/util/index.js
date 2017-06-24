'use strict';

var helper = require('./helper');
var log = require('./log');

var store = {
    helper: helper,
    log: log
};

global.load = function (field) {
    return store[field];
};