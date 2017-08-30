import * as mongoose from "mongoose"
import * as mongodb from "mongodb"
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
    create_date: Date,
    friends: Array<IFriend>
}

interface IFriend {
    id: mongodb.ObjectID,
    create_date: Date
}

const user = new Schema({
    username: String,
    password: String,
    cardGroups: [{
        groupName: String,
        cards: [String]
    }],
    usingGroup: String,
    create_date: Date,
    friends: [{
        id: String,
        create_date: Date
    }]
})

const User = mongoose.model<IUser>('User', user)
export = User 
