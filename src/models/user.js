const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
  username: String,
  nickname: String,
  password: String,
  arrengement: {
    cardGroups: [{
      groupName: String,
      cards: [{
        cardCode: String
      }]
    }],
    usingGroup: {
      groupName: String
    }
  },
  friends: [
    {
      userID: ObjectId,
      username: String
    }
  ],
  create_date: Date
})

module.exports = mongoose.model('user', user)
