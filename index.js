const mineflayer = require('mineflayer')
const farmer = require('./farmer')

const bot = mineflayer.createBot({
    host: 'localhost', // optional
    port: 2404,       // optional
    username: 'Labor', // email and password are required only for
    version: false                 // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
})

const mcdata = require('minecraft-data')(bot.version)

bot.on('chat', function (username, message) {
    if (username === bot.username) return
    bot.chat(message)
})

bot.on("login", client => {
    farmer(bot)
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))