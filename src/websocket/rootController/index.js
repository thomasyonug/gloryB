const decoratorsPath = load('config').path.decorators
const classMeta = require(decoratorsPath).classMeta

module.exports = 
    @classMeta
    class RootController{
        constructor(arg){

        } 
    }