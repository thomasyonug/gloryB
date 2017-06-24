'use strict';

var chalk = require('chalk');

module.exports = function (color, content) {
    console.log(chalk[color](content));
};