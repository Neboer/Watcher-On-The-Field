const {secret, report_to} = require('../../config')

// 汇报器。
function report_inventory(bot) {
    // 用尽可能简短的语言汇报。
    let count = (id) => {
        return bot.inventory.count(id, null)
    }


    bot.on('chat', (username, message, translate, jsonMsg, matches) => {
        let the_mes = JSON.stringify(jsonMsg)
        if (the_mes.indexOf(secret) > -1) {
            let inventory_object = {
                wheat: count(620),
                bread: count(621),
                seed: count(619),// 小麦种子
                powder: count(712), // 骨粉
                hey: count(349),// 干草捆
                empty_box: bot.inventory.emptySlotCount(),
                is_hunger: bot.food <= 18,
            }
            bot.chat(`/tell ${report_to} ${JSON.stringify(inventory_object)}`)
        }
    })
}

module.exports = report_inventory