




declare module 'socket.io' {
    import * as net from 'net';
    import * as http from 'http';
    
    
    export = class Server {
        constructor(server: net.Server)
        
        checkRequest(req: http.IncomingMessage, fn: Function): void
        
        serveClient(v: boolean): Server | boolean
        
        set(key: any, val: any): any
        
        path(v: string): Server | String
        
        adapter(v: any): any
        
        origins(v: string): any

        listen(srv: net.Server, opt: object): Server
        attach(srv: net.Server, opt: object): Server

        attachServe(srv: net.Server): void

        serve(req: http.ServerRequest, res: http.ServerResponse): void

        serveMap(req: http.ServerRequest, res: http.ServerResponse): void

        bind(engine: any): Server

        onconnection(conn: any): Server

        of(name: string, fn: Function): void

        
        close(fn: Function):void

        
        
    }
    
    
}




