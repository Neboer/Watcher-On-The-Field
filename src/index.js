const mineflayer = require('mineflayer')
const earlyHook = require('./hooks')
const {keep_find_a_work_and_do} = require('./works')


const bot = mineflayer.createBot({
    host: '39.99.239.158',
    port: 25565,
    username: 'Kiruya',
    version: '1.16.3',
    viewDistance: "far"
})

bot.on("spawn", () => {
    bot.on("death", () => {
        console.log("bot is killed.")
        bot.end()
        process.exit(1)
    })
    
    setTimeout(() => {
        bot.chat('/login Asdfghj1')
        earlyHook(bot)
        keep_find_a_work_and_do(bot, 1000)
    }, 1000)
})