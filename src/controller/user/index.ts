import {Context} from "koa";

import UserAdminService from "../../serivce/user/admin";
import http from "../../response/http";
import Response from "../../response/response";

class Controller {
    public async index(ctx:Context){
        try {
            const res = await UserAdminService.getAdmin()

            ctx.status = http.STATUSOK
            ctx.body = await Response.SuccessResponse(res)
        }catch (e) {
            ctx.status = http.STATUSINTERNALSERVERERROR
            ctx.body = await Response.ErrorResponse()
        }
    }
}

export default new Controller()