const mineflayer = require('mineflayer')
const earlyHook = require('../hooks')
const {get_item_on_ground, pickup} = require('../works/picker')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 3558,
    username: 'Labor',
    version: '1.16.3',
    viewDistance: "far"
})

bot.on("spawn", async () => {
    earlyHook(bot)
    while (true) {

    }
})