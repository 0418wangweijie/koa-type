/*
* 处理用户发送的消息，返回不同的内容给用户
* */
export default async (message_data:any)=>{
    let options:any = {
        toUserName: message_data.FromUserName,
        fromUserName: message_data.ToUserName,
        createTime: Date.now(),
        msgType: message_data.MsgType,
    }
    let content = '无法识别你发送的消息：请从新输入：1，或者2'
    // 判断用户发送的消息是否是文本内容
    if (message_data.MsgType === 'text') {
        // 判断内容具体内容是什么
        if (message_data.Content === '1') {
            content = '遇见你真好'
        } else if (message_data.Content.match('爱')) { // 半匹配
            content = '我爱你'
        }
    }else if (message_data.MsgType === 'image'){
        options.mediaId = message_data.MediaId
        console.log(message_data.PicUrl)
    }else if(message_data.MsgType === 'voice'){
        options.mediaId = message_data.MediaId
        options.format = message_data.Format
    }else if(message_data.MsgType === 'video'){

    }else if (message_data.MsgType === 'location'){

    }else if(message_data.MsgType === 'news'){

    }else if (message_data.MsgType === 'event'){
        if(message_data.Event === 'subscribe'){
            /*用户关注工号事件*/
            content = '环境你的关注'
        }else if (message_data.Event === 'unsubscribe'){
            /*用户取消关注工号事件*/
        }else if (message_data.Event === 'SCAN'){
            // 用户已经关注了，再次关注时的信息
            console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        }else if(message_data.Event === 'CLICK'){
            console.log(':::::::::::::::::',message_data.EventKey)
        }
    }
    options.content = content
    return options

}