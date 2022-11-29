import {Server} from 'http'

import Koa from 'koa'
import "reflect-metadata"

import '../config'
import db from "../db";
import router from "../router";
import AccessLog from "../middleware/access_log";

db().then(r => console.log('链接成功'))

const app: Koa = new Koa()


app
    .use(router.routes())
    .use(AccessLog)

// 微信接口暂时停用
// .use(wechat)

const run = (port: any): Server => {
    return app.listen(port)
}

export default run