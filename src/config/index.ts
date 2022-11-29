import * as dotenv from 'dotenv'

export default dotenv.config();
export const config: object = {
    server: {
        port: process.env.APP_PORT
    },
    db: {
        db_host: process.env.DB_HOST,
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_port: process.env.DB_PORT
    }
}