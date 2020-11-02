// 生包直接怼脸，非常硬核的堆肥桶使用指南。
async function pile_all_seeds_with_remains(bot, composter, remain_seeds_count){
    await bot.go(composter.position, 0)
    // await bot.LookAt(composter.position)
    bot.logger.info('start piling seeds until little left...')
    bot.Swing = true
    while (bot.inventory.count(619, null) > remain_seeds_count){
        await bot.Grab(619)
        // 生包怼脸xcw
        bot._client.write('block_place', {
            location: composter.position,
            direction: 1,
            hand: 0,
            cursorX: 0.5,
            cursorY: 0.5,
            cursorZ: 0.5,
            insideBlock: false
        })
        await bot.wait(200)
    }
    bot.Swing = false
    bot.logger.info('pile complete.')
}

module.exports = pile_all_seeds_with_remains