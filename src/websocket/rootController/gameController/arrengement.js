const config           = load('config')
const arrengementLib   = require(config.path.lib).arrengementLib

async function arrengement_addCardGroup ({groupName}, socket) {
    await arrengementLib.addCardGroup({username: socket.glory.userInfo.username}, groupName)
    socket.$emit('game', {
        type: 'arrengement_addCardGroup_success'
    })
    arrengement_getCardGroups (null, socket)

}

async function arrengement_getCardGroups (msg, socket) {
    const userInfo = await arrengementLib.findCardGroup({
        username: socket.glory.userInfo.username
    })

    socket.$emit('game', {
        type: 'arrengement_getCardGroups',
        content: userInfo.arrengement.cardGroups
    })
}
module.exports = {
    arrengement_addCardGroup,
    arrengement_getCardGroups
}