import * as mongoose from "mongoose"
const Schema = mongoose.Schema


interface CardGroup {
    groupName: string
    cards: string[]
}

interface IUser extends mongoose.Document {
    username: string
    password: string
    cardGroups: Array<CardGroup>
    usingGroup: string
    create_date: Object
}

const user = new Schema({
    username: String,
    password: String,
    cardGroups: [{
        groupName: String,
        cards: [String]
    }],
    usingGroup: String,
    create_date: Date
})

const User = mongoose.model<IUser>('User', user)
export = User 
