'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const Room           = require('./room')
var Game = require('./game');
// const RootController = require('./rootController')


module.exports = function () {
    function _class(_ref) {
        var app = _ref.app,
            server = _ref.server;

        _classCallCheck(this, _class);

        this.io = require('socket.io')(server);
        this.app = app;

        //初始化对象和控制器
        // this.room = new Room({
        //     io: this.io,
        //     wsClass: this
        // })

        this.game = new Game({
            io: this.io,
            wsClass: this
        });

        // this.rootController = new RootController({
        //     room: this.room,
        //     game: this.game,
        //     wsClass: this
        // })
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            // this.room.init()
            // this.io.on('connection', socket => {
            //     this.rootController.connect(socket)
            // })


            console.log('websocket inited');
        }
    }]);

    return _class;
}();