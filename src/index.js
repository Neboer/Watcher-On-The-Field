const mineflayer = require('mineflayer')
const earlyHook = require('./hooks')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const {keep_find_a_work_and_do} = require('./works')


const bot = mineflayer.createBot({
    host: 'localhost',
    port: 5754,
    username: 'Labor',
    version: '1.16.3',
    viewDistance: "far"
})

bot.loadPlugin(pathfinder)

bot.on("login", () => {
    earlyHook(bot)
    keep_find_a_work_and_do(bot, 1000)
})