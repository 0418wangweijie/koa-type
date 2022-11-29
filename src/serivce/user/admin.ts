import UserAdmin from "../../model/user/user";
import {QueryTypes} from "sequelize";
import {Context} from "koa";


export default class UserAdminService {
    // 获取用户
    public static async getAdmin() {

        // const {user_account,password} = ctx.request.
        // console.log(ctx.request.query)

        // return await UserAdmin.sequelize?.query('SELECT user_account=?,password=?  FROM `user_admin` LIMIT 1', {
        //     type: QueryTypes.SELECT,
        //     raw: false,
        //     mapToModel:true,
        //     replacements: [user_account,password],
        // })
        // return await UserAdmin.findOne({
        //     type: QueryTypes.SELECT,
        //     raw: false,
        // })
    }


}