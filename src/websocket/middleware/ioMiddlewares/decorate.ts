import {green} from "chalk"

let _emit: any = null

const $emit = function (...ev) {
    console.log(green("send--"), ...ev)
    return _emit.call(this, ...ev)
}

export default function (socket, next: Function) {
    if (_emit === null) {
        _emit = socket.emit
    }

    socket.$emit = $emit

    return next()
}