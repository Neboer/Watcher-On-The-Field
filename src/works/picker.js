async function get_item_on_ground(bot) {
    return bot.nearestEntity(entity => {
        return (entity.name === 'item')
    })
}

async function pickup(bot, item) {
    await bot.go(item.position, 0)
}

module.exports = {get_item_on_ground, pickup}