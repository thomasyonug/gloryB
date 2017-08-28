const userModel = require('../models').userModel


async function addFriend(_id, user) {
    const userObj = await userModel.findById(_id)
    console.log(userObj.friends.includes(user))
    if (userObj.friends.includes(user)) {
        console.log("重复啦")
    } else {
        userObj.friends.push(user)
        return userObj.save()
    } 
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


