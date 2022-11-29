/*
* 获取access_token
*   微信调用接口全局唯一凭证
*
*   特点：
*       1.唯一的
*       2.有效期2小时，提前5分钟请求
*       3.接口权限 每天2000次
*
*   请求地址：
*       https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*   请求方式：
*       GET
*
*   设计思路：
*       1.首次本地没有，发送请求获取access_token,保存下来（本地文件）
*       2.第二次或以后，
*           - 先去本地读取文件，判断他是否过期
*           - 过期了
*               - 从新请求获取access_token,保存下来覆盖之前的文件（保证文件是唯一的
*           - 没有过期
*               - 直接使用
*
*   整理思路：
*       读取本地文件（readAccessToken）
*           - 判断是否过期（isValidAccessToken）
*               - 先去本地读取文件，判断他是否过期
*           - 过期了
*               - 从新请求获取access_token（getAccessToken）,保存下来覆盖之前的文件（保证文件是唯一的(saveAccessToken)）
*           - 没有过期
*               - 直接使用
* */

import {readFile, writeFile} from "fs";
import logger from "../../logger";
import {Context, Next} from "koa";

/*
* 获取access_token
* */
async function getAccessToken() {
    const url = `${process.env.WEI_URL}?grant_type=${process.env.WEI_HRANTTYPE}&appid=${process.env.WEI_APPID}&secret=${process.env.WEI_APPSECRET}`

    return await new Promise(async (resolve, reject) => {
        const res = await fetch(url)
        let json = await res.json()

        if (json.access_token) {
            json.expires_in = Date.now() + (json.expires_in - 300) * 1000
            resolve(json)
        } else {
            logger.error("获取access_token失败【getAccessToken】：", res)
            reject('getAccessToken出了问题')
        }
    })
}

/*
* 读取access_token
* */
async function readAccessToken() {
    return await new Promise(async (resolve, reject) => {
        readFile('./access_token.txt','utf8', (err, data) => {
            if (!err) {
                console.log('文件读取成功')
                data = JSON.parse(data)
                resolve(data)
            } else {
                logger.error("文件读取失败【readAccessToken】：", err)
                reject(err)
            }
        })
    })
}

/*
* 存储access_token
* */
async function saveAccessToken(access_token: any) {
    // 将json转化成string
    const access_token_str = JSON.stringify(access_token)
    return await new Promise((resolve, reject) => {
        writeFile('./access_token.txt', access_token_str, err => {
            if (!err) {
                console.log('文件保存成功')
                resolve("存储成功")
            } else {
                logger.error("存储信息失败--【saveAccessToken】", err)
                reject(`存储文件失败：${err}`)
            }
        })
    })
}

/*
* 判断是否失效
* */
async function isValidAccessToken(data: any) {
    if (!data && !data.access_token && !data.expires_in) {
        return false
    }
    return data.expires_in > Date.now()
}


export default async (ctx:Context,next:Next) => {
    /*
     *  用来获取access_token
     *  @return {Promise<any>}access_token
     * */
    if (await isValidAccessToken({access_token:ctx.state.access_token, expires_in:ctx.state.expires_in}) && ctx.state.access_token && ctx.state.expires_in) {
        return Promise.resolve({
            access_token: ctx.state.access_token,
            expires_in: ctx.state.expires_in
        })
    }
     await readAccessToken()
        .then(async res => {
            //    本地有文件
            //    判断是否过期
            if (await isValidAccessToken(res)) {
                return await Promise.resolve(res)
            } else {
                const res = await getAccessToken()
                await saveAccessToken(res)
                // 将请求回来的access_token返回出去
                return await Promise.resolve(res)
            }
        })
        .catch(async err => {
            const res = await getAccessToken()
            await saveAccessToken(res)
            return await Promise.resolve(res)
        })
        .then((res: any) => {
            // 将access_token挂在到this上
            ctx.state.access_token = res.access_token
            ctx.state.expires_in = res.expires_in
            // 返回res包装成promise对像
            Promise.resolve(res)
        })
    await next()
}