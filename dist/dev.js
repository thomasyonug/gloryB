'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var config = require('./config');
var path = require('path');

walk(config.dev.path.src);

function walk(srcPath) {
    var _this = this;

    fs.readdir(srcPath, function (err, files) {
        files.forEach(function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                var filePath, goDeep;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                filePath = path.resolve(srcPath) + '/' + file;
                                _context.next = 4;
                                return isDirectory(filePath);

                            case 4:
                                goDeep = _context.sent;

                                if (goDeep) {
                                    watcher(filePath);
                                    walk(filePath);
                                }
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 8]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
    });
}

function isDirectory(filePath) {
    return new Promise(function (resolve, rej) {
        fs.stat(filePath, function (err, stat) {
            if (err) {
                rej();
            }
            resolve(stat.isDirectory());
        });
    });
}

function watcher(directory) {
    fs.watch(directory, { encoding: 'buffer' }, function (eventType, filename) {});
}