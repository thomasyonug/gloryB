import {userModel} from "../models"
import {IFriend} from '../models/user'

async function addFriend(_id: any, friend:IFriend) {
    const isFriend = await userModel.findOne({_id: _id, 'friends.username': friend.username})
    if (isFriend) {
        return null
    }
    return await userModel.update({_id:_id}, {$push:{friend: friend}})
}

async function deleteFriend(_id: any, username: string) {
    return await userModel.update({_id: _id}, {$pull:{friends: {username: username}}})
}

async function getFriends(_id: any) {
    const users = await userModel.findOne({_id: _id}, {friends: 1})
    return users.friends
}

export {
    addFriend,
    deleteFriend,
    getFriends
}
