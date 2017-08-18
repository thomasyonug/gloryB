const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  create_date: Date
})

module.exports = mongoose.model('user', user)
