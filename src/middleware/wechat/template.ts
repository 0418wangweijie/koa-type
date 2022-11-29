/*
* 用来加工最终回复用户消息的模板
* */
export default async (options: any) => {
    let message_type = '<Content><![CDATA[${options.content}]]></Content>'
    if (options.msgType === 'text') {
        message_type = `<Content><![CDATA[${options.content}]]></Content>`
    } else if (options.msgType === 'image') {
        console.log(options,'????????????????????????????')
        message_type = `<Image>
                          <MediaId><![CDATA[${options.mediaId}]]></MediaId>
                        </Image>`
    } else if (options.msgType === 'voice') {
        message_type = `<Voice>
                            <MediaId><![CDATA[media_id]]></MediaId>
                        </Voice>`
    } else if (options.msgType === 'video') {
        message_type = `<Video>
                          <MediaId><![CDATA[media_id]]></MediaId>
                          <Title><![CDATA[title]]></Title>
                          <Description><![CDATA[description]]></Description>
                        </Video>`
    }
    return (
        `<xml>
        <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
        <MsgType><![CDATA[${options.msgType}]]></MsgType>
        ${message_type}
        </xml>
    `)
}