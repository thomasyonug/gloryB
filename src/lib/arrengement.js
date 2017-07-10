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



module.exports = {
    addCardGroup,
    updateCardGroup
}


