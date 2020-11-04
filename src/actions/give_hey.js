const {report_to} = require('../../config')
const Vec3 = require('vec3')

// 命令机器人丢弃身上的所有干草块。
async function tossAll(bot) {
    bot.logger.info('toss all items')
    let master_player = bot.nearestEntity(entity => {
         return (entity.type === 'player' && entity.username === report_to)
    })
    if (master_player){
        let release = await bot.mutex.acquire()
        await bot.LookAt(master_player.position.add(new Vec3(0,2,0)), false)
        const items = bot.inventory.items() // get the items
        for(let i = 0; items[i]; i++) {
            bot.tossStack(items[i])
            await bot.wait(500)
        }
        await bot.wait(3000)// 等待3秒钟，让人把它捡起来。
        release()
        bot.logger.info('toss complete')
    } else {
        return
    }
}

module.exports = tossAll
