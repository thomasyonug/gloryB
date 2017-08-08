const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://glory:glory@123.206.180.56:27017/glory', function (err) {
  if (err) {
    throw new Error(err)
    process.exit(1)
  }
  console.log('connect success')
})

exports.userModel = require('./user')
