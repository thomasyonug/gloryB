const userModel = require('../models').userModel



async function addCardGroup (query, groupName) {
        return userModel.update(
            query, 
            {   
                $push: {
                    'arrengement.cardGroups': {
                        groupName,
                        cards: []
                    } 
                }
            } 
        ).exec()
}

async function updateCardGroup (group) {
    return new Promise((resolve, rej) => {
        const {
            groupName,
            cards
        } = group

        if (!groupName || !cards) {
            rej(new Error('groupName or cards not found in updateCardGroup'))
            return
        }
        userModel.update(group, {upsert: true}, (err, raw) => {
            if (err) rej(err)
            resolve(raw)
        })
    })
}

async function deleteCardGroup (query) {
    const {
        _id,
        username
    } = query

    const user = await userModel.findOne({username}).exec()
    user.arrengement.cardGroups.pull({_id})
    return user.save()
}

async function findCardGroup (query) {
    return userModel.findOne(query).exec()
}



module.exports = {
    addCardGroup,
    updateCardGroup,
    findCardGroup,
    deleteCardGroup
}


