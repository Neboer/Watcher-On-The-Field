const mineflayer = require('mineflayer')
const {early_hooks, late_hooks} = require('./hooks')
const {bot_config, login_immediate} = require('../config')
const start_event_loop = require('./works')
const bind_logger = require('./hooks/logger')
// const inventoryViewer = require('mineflayer-web-inventory')

const bot = mineflayer.createBot(bot_config)

bind_logger(bot)
// inventoryViewer(bot)
bot.on("spawn", () => {
    bot.logger.info('bot is spawned')

    bot.on("death", () => {
        bot.logger.alert('bot is killed')
        bot.end()
        process.exit(1)
    })

    login_immediate(bot).then(() => {
        early_hooks(bot);
    }).then(() => {
        setTimeout(() => {
            late_hooks(bot)
            // console.log(bot.inventory.items())
            bot.logger.info('bot is login')
            start_event_loop(bot, 1000)
        }, 3000)
    })
})