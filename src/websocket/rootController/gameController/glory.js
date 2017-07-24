const arrengementLib   = require('../../../lib').arrengementLib



async function _initStoreCards (msg, socket) {
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

    return {
        hostCards: results[0].arrengement.cardGroups.find(group => group.groupName === results[0].arrengement.usingGroup.groupName).cards,
        guestCards: results[1].arrengement.cardGroups.find(group => group.groupName === results[1].arrengement.usingGroup.groupName).cards
    }
    // hostSocket.$emit('game', {
    //     type: 'glory_initStoreCards',
    //     content: {
    //         ...content,
    //         role: 'host'
    //     }
    // })

    // guest.$emit('game', {
    //     type: 'glory_initStoreCards',
    //     content: {
    //         ...content,
    //         role: 'guest'
    //     }
    // })
}

async function _initGod (msg, socket) {
    const {
        room,
        userInfo
    } = socket.glory

    const hostSocket = room.host
    const guest      = room.guests.get(0)

    return {
        host: {
            index: 'first'
        },
        guest: {
            index: 'second'
        }
    }
}

async function glory_initAll (msg, socket) {
    const [
        cardsContent,
        godContent
    ] = await Promise.all([
        _initStoreCards(msg, socket),
        _initGod(msg, socket)
    ])

    const {
        room,
        userInfo
    } = socket.glory

    const hostSocket  = room.host
    const guestSocket = room.guests.get(0)

    

    hostSocket.$emit('game', {
        type: 'glory_initAll',
        content: {
            initStoreContent: {
                content: {
                    storeCards: cardsContent.hostCards,
                    e_storeCards: cardsContent.guestCards
                }
            },
            initGodContent: {
                content: {
                    index: 'first'
                }
            }
        }
    })

    guestSocket.$emit('game', {
        type: 'glory_initAll',
        content: {
            initStoreContent: {
                content: {
                    e_storeCards: cardsContent.hostCards,
                    storeCards: cardsContent.guestCards
                }
            },
            initGodContent: {
                content: {
                    index: 'second'
                }
            }
        }
    })

}




module.exports = {
    glory_initAll
}