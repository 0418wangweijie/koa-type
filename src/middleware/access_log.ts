import {Context, Next} from "koa";
import {accessLogger} from "../logger";

export default (ctx:Context,next:Next)=>{
    const log_str:string = `path:${ctx.path} | method:${ctx.method} | user-agent:${ctx.header["user-agent"]}`
    accessLogger.info(log_str)
    return next()
}