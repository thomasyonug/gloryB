


async function transfer (msg, socket) {
    const {
        room,
        userInfo
    } = socket.glory

    const hostSocket = room.host
    const guest      = room.guests.get(0)

    const otherSocket = socket === guest ? hostSocket : guest

    otherSocket.$emit('game', {
        type: 'glory_transfer',
        content: msg
    })

}















module.exports = {
    transfer
}