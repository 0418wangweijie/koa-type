import {configure, getLogger} from 'log4js'

configure({
    appenders: {
        cheese: {type: "file", filename: "logs/cheese.log"},
        access: {type: "file", filename: "logs/access.log"},
        db: {type: "file", filename: "logs/db.log"}
    },
    categories: {
        default: {appenders: ["cheese"], level: "all"},
        access: {appenders: ["access"], level: "all"},
        db: {appenders: ["db"], level: "info"}
    },
});

export const accessLogger = getLogger('access')
export const dbLogger = getLogger("db")
export default getLogger()