const mineflayer = require('mineflayer')
const earlyHook = require('./hooks')
const {keep_find_a_work_and_do} = require('./works')
const {bot_config, login_immediate} = require('../config')

const bot = mineflayer.createBot(bot_config)

bot.on("spawn", () => {
    bot.on("death", () => {
        console.log("bot is killed.")
        bot.end()
        process.exit(1)
    })
    login_immediate(bot).then(() => {
            earlyHook(bot);
            return keep_find_a_work_and_do(bot, 1000)
        }
    )
})