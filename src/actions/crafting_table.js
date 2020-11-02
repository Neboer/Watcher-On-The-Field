let bot

function cf_bind_bot(x) {bot = x}

// mineflayer提供的crafting table方法过于酣皮，这里重新实现一个。
function craft_9groups_of_wheat_into_1groups_of_hay(craftingTable) {
    return new Promise((resolve) => {
        bot.go(craftingTable.position, 2).then(() => bot.LookAt(craftingTable.position, false))
            .then(() => {
                bot.logger.info('Craft 1 group of hay')
                bot.activateBlock(craftingTable)
                bot.once('windowOpen', async (window) => {
                    let box_need_to_fill = 1
                    for (let i = 0; i < window.slots.length && box_need_to_fill <= 9; i++) {
                        let item = window.slots[i]
                        if (item && item.type === 620 && item.count === 64) {
                            await bot.ClickWindow(i, 0, 0)
                            await bot.ClickWindow(box_need_to_fill, 0, 0)
                            box_need_to_fill++;
                            await bot.wait(500)
                        }
                    }
                    await bot.wait(1000)
                    // 直接发包，管你***
                    bot._client.write('window_click', {
                        windowId: window.id,
                        slot: 0,
                        mouseButton: 0,
                        action: 19,
                        mode: 1,
                        item: {present: false}
                    })
                    await bot.wait(1000)// 就硬等。
                    bot.closeWindow(window)
                    bot.logger.info('Crafting complete')
                    resolve()
                })
            })
    })
}

module.exports = {craft_9groups_of_wheat_into_1groups_of_hay, cf_bind_bot}