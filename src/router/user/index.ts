import Router from "koa-router";

import Controller from "../../controller/user";

export default (router: Router<any, {}>) =>{
    router.get('/',Controller.index)
}