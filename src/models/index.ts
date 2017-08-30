import * as mongoose from "mongoose"
import * as userModel from "./user"

// mongoose.Promise = global.Promise

const mongoUrl = "mongodb://glory:glory@localhost:27017/glory"

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