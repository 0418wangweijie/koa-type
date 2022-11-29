import {parseString} from 'xml2js'
import logger from "../logger";
import {type} from "os";

export default class Tool {
    // 解析数据
    public static async getUserData(req: any) {
        let xml_data = ''
        await req
                .on('data', (data: any) => {
                    xml_data += data
                })
        return xml_data

        // // return await
        // return await new Promise(async (resolve, rejects) => {
        //     let xml_data = ''
        //     req
        //         .on('data', (data: any) => {
        //             xml_data += data
        //         })
        //         .on('close', () => {
        //             resolve(xml_data)
        //         })
        // })
    }

    // 转换xml为json
    public static async parseXML(xml_data: any) {
        return await new Promise(async (resolve, reject)=>{
            await parseString(xml_data, {trim: true}, async (err, result) => {
                if (!err) {
                    resolve(result.xml)
                } else {
                    logger.error(`XML转换失败【parseXML】:`,err)
                    reject(`XML转换失败【parseXML】${err}`)
                }
            })
        })
    }

    // 将对象中的数组转换成字符串
    public static async formatMessage(json_data:any){
        let message:any = {}

        if(typeof json_data === 'object'){
            for (let key in json_data){
                let value:Array<string> = json_data[key]
                // 过滤空的数据
                if (Array.isArray(value) && value.length > 0){
                    message[key] = value[0]
                }
            }
        }
        return message
    }
}