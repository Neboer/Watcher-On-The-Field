const in_range = require('../hooks/range')

async function get_item_on_ground(bot) {
    return bot.nearestEntity(entity => {
        return (entity.name === 'item' && in_range(entity.position) && Math.abs(entity.position.y - bot.entity.position.y) < 0.1)
    })
}

async function pickup(bot, item) {
    await bot.go(item.position, 0)
}

module.exports = {get_item_on_ground, pickup}