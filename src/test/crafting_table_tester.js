const mineflayer = require('mineflayer')
const cbConverter = require('../hooks/callback_converter')


const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: 'Kiruya',
    version: '1.16.3',
    viewDistance: "far"
})

bot.ClickWindow = cbConverter(bot.clickWindow, 1000)

bot.wait = function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

bot.on('spawn', async function () {
    let cft = bot.findBlock({matching: 151})// crafting tabl
    // bot.chat('/tp Kiruya Neboer')
    bot.chat('/clear Kiruya')
    await bot.wait(500)
    bot.chat('/give Kiruya minecraft:wheat 640')
    await bot.wait(2000)
    bot.activateBlock(cft)

    bot.once('windowOpen', async (window) => {
        let box_need_to_fill = 1
        for (let i = 0; i < window.slots.length && box_need_to_fill <= 9; i++) {
            let item = window.slots[i]
            if (item && item.type === 620 && item.stackSize === 64) {
                await bot.ClickWindow(i, 0, 0)
                await bot.ClickWindow(box_need_to_fill, 0, 0)
                box_need_to_fill++;
            }
        }
        bot._client.write('window_click', {
            windowId: window.id,
            slot: 0,
            mouseButton: 0,
            action: 19,
            mode: 1,
            item: {present: false}
        })
        await bot.wait(2000)
        console.log(window.slots)
        bot.closeWindow(window)
    })


})
