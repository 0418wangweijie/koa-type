const
    SuccessResponse = {code: 10000, message: '请求成功', data: undefined
    },
    ErrorResponse = {code: 10001, message: '请求失败'},
    ErrorConflictResponse = {code: 10002, message: '存在冲突'},
    ErrorInternalServer = {code: 10003, message: '系统错误'},

    ErrorTokenExpired = {code: 10101, message: 'token已过期'},
    ErrorToken = {code: 10102, message: '无效token'}


export default class Response {
    public static async SuccessResponse(data:any, message?:string) {
        let response = SuccessResponse
        response.message = message || SuccessResponse.message
        response.data = data
        return response
    }

    public static async ErrorResponse(message?:string) {
        let response = ErrorResponse
        response.message = message || ErrorResponse.message
        return response
    }

    async ErrorConflictResponse(message:string) {
        let response = ErrorConflictResponse
        response.message = message || ErrorConflictResponse.message
        return response
    }

    async ErrorInternalServer(message:string) {
        let response = ErrorInternalServer
        response.message = message || ErrorInternalServer.message
        return response
    }

    async ErrorTokenExpired() {
        return ErrorTokenExpired
    }

    async ErrorToken() {
        return ErrorToken
    }
}