

module.exports = (socket, next) => {
    const token = socket.handshake.query.token;
    if (token === 'session1') {
        return next()
    } else {
        return next(new Error('authentication error'))
    }
}