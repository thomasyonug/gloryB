const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/glory', function (err) {
  if (err) {
    throw new Error(err)
    process.exit(1)
  }
  console.log('connect success')
})

exports.userModel = require('./user')
