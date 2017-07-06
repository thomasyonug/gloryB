const Room           = require('./room')
const Game           = require('./game')
const RootController = require('./rootController')
const jwt            = require('jsonwebtoken')
const log            = load('log')
const emitError      = load('error').emitError
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
            

            

            io.on('connection', async socket => {
                socketMiddlewares.forEach(socketMiddleware => {
                    socket.use(socketMiddleware)
                })

                if (await !this._loginCheck(socket)) {
                    emitError(socket)('unauth')
                    socket.disconnect()
                    return
                }

                rootController.connect(socket)

                socket.on('room', msg => {
                    rootController.roomController(msg, socket)
                })

                socket.on('game', msg => {
                    rootController.gameController(msg, socket)
                })



                socket.on('disconnect', reason => {
                    rootController.metaController({
                        type: 'disconnect',
                        content: reason
                    }, socket)
                })



            })
        }



        async _loginCheck (socket) {
            socket.glory.userInfo = await new Promise((resolve, rej) => {
                jwt.verify(socket.handshake.query.token, 'fuck u', (err, decode) => {
                    if (err) resolve(false)
                    resolve(decode)
                })
            })
            return socket.glory.userInfo
        }


    }