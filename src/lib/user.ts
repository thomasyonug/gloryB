import { userModel } from "../models"

async function loginCheck(user: string) {
    const res = await userModel.find(user)
    return res.length ? true : false
}

async function queryInfo(user: string) {
    return userModel.findOne(user).exec()
}

export {
    loginCheck,
    queryInfo
}