const Room           = require('./room')
const Game           = require('./game')
const RootController = require('./rootController')
const log            = load('log')
const classMeta      = require(load('config').path.decorators).classMeta
const { ioMiddlewares, socketMiddlewares } = require('./middleware')


module.exports = 
    @classMeta
    class WebSocket{
        io;
        app;
        room;
        game;
        rootController;

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
            const {
                io,
                rootController
            } = this

            ioMiddlewares.forEach(ioMiddleware => {
                io.use(ioMiddleware)
            })
            

            

            io.on('connection', socket => {
                socketMiddlewares.forEach(socketMiddleware => {
                    socket.use(socketMiddleware)
                })

                rootController.connect(socket)

                socket.on('room', msg => {
                    rootController.roomController(msg, socket)
                })
                socket.on('game', msg => {
                    rootController.gameController(msg, socket)
                })

            })
        }
    }