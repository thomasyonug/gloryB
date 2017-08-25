const userModel = require('../models').userModel


async function addFriend(_id, user) {
    const userObj = userModel.findById(_id)
    userObj.friends.push(user)
    return userObj.save()
}
async function deleteFriend(_id, username) {
    const user = userModel.findById(_id)
    user.friends = user.friends.$delete(friend => friend.username === username)
    return user.save()
}

async function getFriends(_id) {
    const users = await userModel.findById(_id)
    return users.friends
}


module.exports = {
    addFriend,
    getFriends,
    deleteFriend
}


