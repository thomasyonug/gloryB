import {userModel} from "../models"

async function addCardGroup(query: string | Object, groupName: string) {
    return userModel.update(query, {
        $push: {
            "cardGroups": {
                groupName,
                cards: []
            }
        }
    })
}

async function updateCardGroup({username}: {username: string}, 
    {groupName,cards}: {groupName:string, cards: Array<string>}) {

    return userModel.update({username, 'cardGroups.groupName': groupName}, {
        $set: {
            "cardGroups.$.cards": cards
        }
    })
}

async function deleteCardGroup (query:any) {
    const {_id, username}:{_id: string, username: string} = query

    const user = await userModel.findOne({username}).exec()
    user.cardGroups.pull({_id})
    return user.save()
}

async function findCardGroup (query: Object) {
    return userModel.findOne(query).exec()
}

export {
    addCardGroup,
    updateCardGroup,
    findCardGroup,
    deleteCardGroup
}