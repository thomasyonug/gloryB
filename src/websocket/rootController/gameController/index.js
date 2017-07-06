const classMeta = require(load('config').path.decorators).classMeta
const Entity    = require('../entity')

module.exports = 
    @classMeta
    class GameController extends Entity{
        game;
        io;

        constructor ({game}) {
            super()
        }


    }