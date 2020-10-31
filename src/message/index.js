const {toss_secret, report_secret, report_to} = require('../../config')
const get_chat = require('./message_resolver')
const toss_all = require('../actions/give_hey')

function bind_reporter(bot) {
    bot.on('message', async (json_msg, position) => {
        let message = get_chat(json_msg)
        if (message && message.username === report_to) {
            bot.logger.info('receive master message ' + message.message)
            if (message.message === toss_secret) await toss_all(bot)
            if (message.message === report_secret) {
                let count = (id) => {
                    return bot.inventory.count(id, null)
                }
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
                bot.logger.info('report inventory state to master')
            }
        }
    })
}


module.exports = bind_reporter