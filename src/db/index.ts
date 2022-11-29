import path from "path";

import {Sequelize} from "sequelize-typescript";
import {dbLogger} from "../logger";

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PWD as string, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    dialect: "mysql",   // 数据库
    define: {    // 表默认字段
        // timestamps: true,    // 时间戳
        createdAt: 'created_at', // 创建时间
        updatedAt: 'updated_at', // 更新时间
        // deletedAt: 'deleted_at' // 删除时间
    },
    logging: msg => dbLogger.info(msg),
    models: [path.join(__dirname, '../model/**/*.ts'), path.join(__dirname, '../model/**/*.js')] // 加载
})

export default async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}