import {blue} from "chalk"

export default function (packet, next: Function) {
    console.log(blue("receive ---"), packet)
    return next()
}