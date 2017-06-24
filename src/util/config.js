const path = require('path')
const prefix = process.cwd()

module.exports = {
    path: {
        "@": path.resolve(prefix + '/src'),
        api: path.resolve(prefix + '/src/api'),
        lib: path.resolve(prefix + '/src/lib'),
        models: path.resolve(prefix + '/src/models'),
        util: path.resolve(prefix + '/src/util'),
        websocket: path.resolve(prefix + '/src/websocket'),
        middleware: path.resolve(prefix + '/src/middleware'),
        public: path.resolve(prefix + '/src/public'),
        decorators: path.resolve(prefix + '/src/decorators')
    },
    dev: {
        port: 8888
    }
}