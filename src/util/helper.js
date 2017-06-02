

module.exports = {
    hasProps (obj, keys) {
        return obj != undefined && keys.every(key => obj[key])
    }
}
