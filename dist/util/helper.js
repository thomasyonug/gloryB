"use strict";

module.exports = {
    hasProps: function hasProps(obj, keys) {
        return obj != undefined && keys.every(function (key) {
            return obj[key];
        });
    }
};