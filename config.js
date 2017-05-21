const path = require('path')


module.exports = {
    path: {
        "@": path.resolve('./src'),
        api: path.resolve('./src/api'),
        lib: path.resolve('./src/lib'),
        models: path.resolve('./src/models'),
        util: path.resolve('./src/util'),
        websocket: path.resolve('./src/websocket'),
        middleware: path.resolve('./src/middleware'),
        public: path.resolve('./src/public')
    },
    dev: {
        port: 8888
    }
}