const userModel = require('../models').userModel


async function loginCheck (user) {
     const res = await userModel.find(user)
     return res.length ? true : false
}





module.exports = {
    loginCheck
}


