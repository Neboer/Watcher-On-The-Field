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
earlyHook(bot)
bot.on("spawn", async () => {
    while (true) {
        let item = await get_item_on_ground(bot)
        if (item) {
            // console.log(item.position)
            await pickup(bot, item)
            // console.log("end")
        }
        await wait(1000)
    }
})