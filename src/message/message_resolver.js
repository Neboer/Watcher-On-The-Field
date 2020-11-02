function get_chat_message(json_mes) {
    // console.log(JSON.stringify(json_mes))
    let data
    try {
        data = json_mes.extra[1].text.match(/§6\[§e私聊§6] §6§4(.*?) §4§c私聊:§7 §7(.*?)§7/)
        //data = ['', json_mes.with[0].json.hoverEvent.contents.name.text, json_mes.json.with[1].text]
    } catch (e) {}
    if (data) {
        return {
            username: data[1],
            message: data[2]
        }
    }
}

module.exports = get_chat_message
