const mineflayer = require('mineflayer')
const farmer = require('./crop_cutter')
const start = require('./main_loop')

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 33831,
    username: 'Labor',
    version: '1.16.3'
})

const mcdata = require('minecraft-data')(bot.version)

bot.on('chat', function (username, message) {
    if (username === bot.username) return
    bot.chat(message)
})

bot.on('error', (err) => {
    console.error(err)
})

bot.on("login", () => {
    start(bot)
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))