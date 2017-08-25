const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')
const emitError = load('error').emitError
const friendsLib = require('../../../lib').friendsLib

module.exports = 
    @classMeta
    class FriendsController extends Entity{
        room = null;
        io = null;

        constructor ({room, io}) {
            super()
            Object.assign(this, {
                room,
                io
            })
        }


        async createHandler (socket) {

            await this._initFriends(socket)

            await this.onlineTrigger(socket)

            return msg => {
                this.on(msg, socket)
            }
        }

        async addFriends (content, socket) {
            const {
                username
            } = content

            const targetSocket = this.room.allSocketStore.get(username)

            if (!targetSocket) {
                return emitError(socket)(`cant find online user ${username}`)
            }

            try {
                await friendsLib.addFriend(socket.glory.userInfo._id, targetSocket.glory.userInfo)
            } catch (err) {
                emitError(socket)(err)
            }

            this._initFriends(socket)
        }

        async deleteFriends (content, socket) {
            const {
                username
            } = content

            try {
                await friendsLib.deleteFriend(socket.glory.userInfo._id, username)
            } catch (err) {
                emitError(socket)(err)
            }
            
            this._initFriends(socket)
        }

        async offlineTrigger (socket) {
            const { onlineFriends } = socket.glory.friends

            onlineFriends.forEach(onlineFriend => {
                const onlineFriendSocket = this.room.allSocketStore.get(onlineFriend.username)

                onlineFriendSocket.glory.friends.onlineFriends = onlineFriendSocket.glory.friends.onlineFriends.$delete(i => i.username === onlineFriend.username)

                this._initFriends(onlineFriendSocket)
            })
            
        }

        async onlineTrigger (socket) {
            const { onlineFriends } = socket.glory.friends

            onlineFriends.forEach(onlineFriend => {
                const onlineFriendSocket = this.room.allSocketStore.get(onlineFriend.username)

                onlineFriendSocket.glory.friends.onlineFriends.push(onlineFriend)

                this._initFriends(onlineFriendSocket)
            })
        }



        async _initFriends (socket) {
            const friends = await friendsLib.getFriends(socket.glory.userInfo._id)

            //找出在线的好友
            const onlineFriends = friends.filter(friend => {
                return this.room.allSocketStore.get(friend.username)
            })

            //保存为热数据
            socket.glory.friends = {
                allFriends: friends,
                onlineFriends
            }

            socket.$emit('friends', {
                type: 'initFriends',
                content: socket.glory.friends
            })
        }


    }