const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017', function (err) {//mongodb://glory:glory@123.206.180.56:27017/glory
  if (err) {
    throw new Error(err)
    process.exit(1)
  }
  console.log('connect success')
})

exports.userModel = require('./user')
