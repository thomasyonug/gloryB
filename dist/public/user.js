'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = require('koa-better-router');
var router = Router().loadMethods();

var _require = require('../lib'),
    userLib = _require.userLib;

router.post('/login', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var match;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return userLib.loginCheck(ctx.request.body);

                    case 2:
                        match = _context.sent;

                        if (match) {
                            ctx.body = {
                                errcode: 0
                            };
                            ctx.session = ctx.request.body;
                        } else {
                            try {
                                ctx.throw(400, 'username or password not find');
                            } catch (err) {
                                ctx.body = err;
                            }
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

module.exports = router;