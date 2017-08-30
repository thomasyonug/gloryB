export default function(socket, next: Function) {
    socket.glory = {}
    return next()
}