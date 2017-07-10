const config           = load('config')
const arrengementLib   = require(config.path.lib).arrengementLib


module.exports = {
    async arrengement_addCardGroup ({groupName}, socket) {
        await arrengementLib.addCardGroup({username: socket.glory.userInfo.username}, groupName)
        socket.$emit('game', {
            type: 'arrengement_addCardGroup_success'
        })
    }
}