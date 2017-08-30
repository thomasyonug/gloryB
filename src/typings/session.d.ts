import * as Koa from "koa"

declare module "koa" {
    export interface Context extends Request, Response {
        session: any
	}
}
