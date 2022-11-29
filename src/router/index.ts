import Router from "koa-router";

import User from "./user";


const router = new Router()
// 调取接口前校验
// 微信接口暂时停用
// router.use(AccessToken)

const admin_router = router.prefix('/admin')

User(admin_router)

export default router