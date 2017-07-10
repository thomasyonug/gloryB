
Object.assign(Array.prototype, {
    $deleteUnpure (arg) {
        let index

        switch (typeof arg) {
            case 'function':
                index = this.findIndex(arg)
            break;
            case 'number':
                index = arg
            break;
            case 'object':
                index = this.findIndex(item => arg === item)
            break;
            default:
            return tempArr 
        }
        return this.splice(index, 1)
    }
})