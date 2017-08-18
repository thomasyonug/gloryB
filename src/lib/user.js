const userModel = require('../models').userModel


async function loginCheck (user) {
     const res = await userModel.find(user)
     return res.length ? true : false
}


async function queryInfo (user) {
    return userModel.findOne(user).exec()
}

async function createNewUser (user){
    let newUser = userModel({
        username: user.username,
        nickname: user.nickname,
        password: user.password,
        arrengement: {
            cardGroups: [{
                groupName: '',
                cards: []
            }],
            usingGroup: {
                groupName: ''
            }
        },
        create_date: new Date()
    });
    newUser.save(function(err, result){
        if(err) throw err;
        console.log("success")
    })
    return true
}

module.exports = {
    loginCheck,
    queryInfo,
    createNewUser
}


