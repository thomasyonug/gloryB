const userModel = require('../models').userModel


async function loginCheck (user) {
     const res = await userModel.find(user)
     return res.length ? true : false
}


async function queryInfo (user) {
    return userModel.findOne(user).exec()
}
module.exports = {
    loginCheck,
    queryInfo
}


