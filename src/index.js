const mineflayer = require('mineflayer')
const {early_hooks, late_hooks} = require('./hooks')
const {bot_config, login_immediate} = require('../config')
const start_event_loop = require('./works')

const bot = mineflayer.createBot(bot_config)

bot.on("spawn", () => {
    bot.on("death", () => {
        console.log("bot is killed.")
        bot.end()
        process.exit(1)
    })

    login_immediate(bot).then(() => {
        early_hooks(bot);
    }).then(() => {
        setTimeout(() => {
            late_hooks(bot)
            // console.log(bot.inventory.items())
            start_event_loop(bot, 1000)
        }, 3000)
    })
})