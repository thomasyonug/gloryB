'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomStore = require('./roomCoreClass');

module.exports = function () {
    function _class(_ref) {
        var io = _ref.io,
            socket = _ref.socket;

        _classCallCheck(this, _class);

        this.io = io;
        this.roomStore = new RoomStore();
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.io.on('connection', function (socket) {
                _this.roomStore.joinOutside(socket);

                // socket.on('room', msg => )

                // socket.on('createRoom', msg => this.createRoomHandle(socket, msg))
                // socket.on('getRooms', msg => this.getRoomsHandle(socket, msg))
                // socket.on('joinRoom', msg => this.joinRoomHandle(socket, msg))
                // socket.on('leaveRoom', msg => this.leaveRoomHandle(socket, msg))

                // //native event
                // socket.on('disconnect', msg => this.disconnectHandle(socket, msg))
            });
        }
    }, {
        key: 'createRoomHandle',
        value: function createRoomHandle(socket, msg) {
            var name = msg.name;

            this.roomStore.create(name, socket);
            this.joinRoomHandle(socket, {
                roomID: socket.adapter._room
            });
        }
    }, {
        key: 'getRoomsHandle',
        value: function getRoomsHandle(socket, msg) {
            socket.emit('getRooms', this.roomStore.getAsArray());
        }
    }, {
        key: 'joinRoomHandle',
        value: function joinRoomHandle(socket, msg) {
            var roomID = msg.roomID;

            this.roomStore.join(roomID, socket);
            this.io.to(roomID).emit('joinRoom', this.roomStore.store[roomID]);
        }
    }, {
        key: 'leaveRoomHandle',
        value: function leaveRoomHandle(socket, msg) {
            var roomID = socket.adapter._room;
            this.roomStore.leave(socket);
            this.io.to(roomID).emit('joinRoom', this.roomStore.store[roomID]);
        }
    }, {
        key: 'disconnectHandle',
        value: function disconnectHandle(socket, msg) {
            this.roomStore.offline(socket);
        }
    }, {
        key: 'updateRoomAllMember',
        value: function updateRoomAllMember(roomID) {}
    }]);

    return _class;
}();