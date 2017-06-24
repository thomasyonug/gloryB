const Room           = require('./room')
const Game           = require('./game')
const RootController = require('./rootController')
const log            = load('log')


module.exports = class {
    constructor({app, server}){
        this.io = require('socket.io')(server)
        this.app = app
        




        //初始化对象和控制器
        this.room = new Room({
            io: this.io,
            wsClass: this
        })
        this.game = new Game({
            io: this.io,
            wsClass: this
        })
        this.rootController = new RootController({
            io: this.io,
            room: this.room,
            game: this.game,
            wsClass: this
        })
    }

    init () {
        // this.room.init()
        // this.io.on('connection', socket => {
        //     this.rootController.connect(socket)
        // })



        log('cyan' ,'[[    websocket ready  ]] ready')
    }
}