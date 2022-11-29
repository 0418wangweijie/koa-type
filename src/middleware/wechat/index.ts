import sha1 from "sha1";
import Tool from "../../utils/tool";
import template from "./template";
import reply from "./reply";

export default async (ctx: any) => {

    const {signature, echostr, timestamp, nonce} = ctx.query
    // 拼接成字符串你
    const str_sha1 = sha1([timestamp, nonce, process.env.WEI_TOKEN]?.sort()?.join(''))

    if (ctx.method === 'GET') {
        if (str_sha1 === signature) {
            ctx.body = echostr
        } else {
            return ctx.body = 'error'
        }
    } else if (ctx.method === 'POST') {
        console.log('????????????????????????????????????')
        // 接受情趣体中的数据 流式数据
        const xml_data: any = await Tool.getUserData(ctx.req)
        // const new_xml_data = xml_data.replace('\ufeff', '')
        // xml数据解析为js对象
        const json_data = await Tool.parseXML(xml_data)
        console.log(json_data)
        const message_data = await Tool.formatMessage(json_data)
        const options = await reply(message_data)
        const new_template:any = await template(options)
        console.log('/**************************************/')
        console.log(new_template)
        ctx.body = new_template
        // 简单的自动回复
        // ctx.body = `<xml><ToUserName><![CDATA[${message_data.FromUserName}]]></ToUserName><FromUserName><![CDATA[${message_data.ToUserName}]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[${message_data.MsgType}]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`
    } else {
        ctx.body = 'error'
    }
}