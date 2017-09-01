import { userModel } from "../models"
import {IUser} from '../models/user'

async function loginCheck(user: {username:string}) {
    const res = await userModel.find(user)
    return res.length ? true : false
}

async function queryInfo(user: string) {
    return userModel.findOne(user).exec()
}

async function createNewUser(user: IUser) {
}

export {
    loginCheck,
    queryInfo
}