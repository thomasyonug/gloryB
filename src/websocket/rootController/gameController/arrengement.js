const arrengementLib   = require('../../../lib').arrengementLib

async function arrengement_getCardGroups (msg, socket) {
    const userInfo = await arrengementLib.findCardGroup({
        username: socket.glory.userInfo.username
    })

    socket.$emit('game', {
        type: 'arrengement_getCardGroups',
        content: userInfo.arrengement.cardGroups
    })
}

async function arrengement_addCardGroup ({groupName}, socket) {
    await arrengementLib.addCardGroup({username: socket.glory.userInfo.username}, groupName)
    socket.$emit('game', {
        type: 'arrengement_addCardGroup_success'
    })
    arrengement_getCardGroups(null, socket)

}


async function arrengement_deleteCardGroup ({_id}, socket) {
    await arrengementLib.deleteCardGroup({username: socket.glory.userInfo.username, _id})

    arrengement_getCardGroups(null, socket)
}

async function arrengement_updateCardGroup (msg, socket) {
    await arrengementLib.updateCardGroup({username: socket.glory.userInfo.username}, msg)

    arrengement_getCardGroups(null, socket)
}


module.exports = {
    arrengement_addCardGroup,
    arrengement_getCardGroups,
    arrengement_deleteCardGroup,
    arrengement_updateCardGroup
}