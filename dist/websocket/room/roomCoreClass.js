'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = require('uuid/v4');

function setSocketRoomID(socket, roomID) {
    socket.adapter._room = roomID;
}

module.exports = function () {
    function RoomCore() {
        _classCallCheck(this, RoomCore);

        this.store = {};
        this.outside = {};
        this.storeLength = 0;
        this.outsideLength = 0;
    }

    _createClass(RoomCore, [{
        key: 'create',
        value: function create(name, socket) {
            var id = uuid();
            this.store[id] = {
                name: name,
                host: socket.id,
                guests: [],
                id: id
            };
            setSocketRoomID(socket, id);
            this.storeLength++;
        }
    }, {
        key: 'join',
        value: function join(roomID, socket) {
            socket.join(roomID);
            this.store[roomID].guests.push(socket.id);
            setSocketRoomID(socket, roomID);
        }
    }, {
        key: 'joinOutside',
        value: function joinOutside(socket) {
            socket.join('outside');
            this.outside[socket.id] = socket.id;
            setSocketRoomID(socket, 'outside');
            this.outsideLength++;
        }
    }, {
        key: 'leaveOutside',
        value: function leaveOutside(socket) {
            socket.leave('outside');
            this.outside[socket.id] = undefined;
            this.outsideLength--;
        }
    }, {
        key: 'leave',
        value: function leave(socket) {
            if (socket.adapter._room === 'outside') return;
            var room = this.store[socket.adapter._room];
            var index = room.guests.findIndex(function (guest) {
                return guest === socket.id;
            });
            //减少客人
            room.guests.splice(index, 1);
            //判断是否销毁房间
            if (room.guests.length < 2) {
                this.store[socket.adapter._room] = undefined;
            }
        }
    }, {
        key: 'offline',
        value: function offline(socket) {
            this.leaveOutside(socket);
            this.leave(socket);
        }
    }, {
        key: 'getAsArray',
        value: function getAsArray() {
            var _this = this;

            return Object.keys(this.store).map(function (name) {
                return _this.store[name];
            }).filter(function (item) {
                return item;
            });
        }
    }, {
        key: 'getAsObject',
        value: function getAsObject() {
            return this.store;
        }
    }]);

    return RoomCore;
}();