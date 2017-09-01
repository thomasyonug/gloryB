import * as mongoose from "mongoose"
import userModel from "./user"

// mongoose.Promise = global.Promise

const mongoUrl = "mongodb://glory:glory@123.206.180.56:27017/glory"

mongoose.connect(mongoUrl , function (err) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log('connect to mongodb success', mongoUrl)
})

export {
    userModel
}