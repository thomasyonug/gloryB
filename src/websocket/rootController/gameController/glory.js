const arrengementLib   = require('../../../lib').arrengementLib



async function glory_initStoreCards (msg, socket) {
    //传送各方卡组
    const {
        room,
        userInfo
    } = socket.glory

    const hostSocket = room.host
    const guest      = room.guests.get(0)

    const results = await Promise.all([
        arrengementLib.findCardGroup({username: hostSocket.glory.userInfo.username}),
        arrengementLib.findCardGroup({username: guest.glory.userInfo.username})
    ])

    const content = {
        hostCards: results[0].arrengement.cardGroups[0].cards,
        guestCards: results[1].arrengement.cardGroups[0].cards
    }
    hostSocket.$emit('game', {
        type: 'glory_initStoreCards',
        content: {
            ...content,
            role: 'host'
        }
    })

    guest.$emit('game', {
        type: 'glory_initStoreCards',
        content: {
            ...content,
            role: 'guest'
        }
    })
}


module.exports = {
    glory_initStoreCards
}