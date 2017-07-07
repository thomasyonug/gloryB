const classMeta = require('../../decorators').classMeta




module.exports = 
    @classMeta
    class Game {
        io;

        constructor ({io}) {
            Object.assign(this, {
                io
            })
        }
    }


