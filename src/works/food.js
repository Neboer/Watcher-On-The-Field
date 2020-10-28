async function need_eat_bread(bot) {
    let wheat_count = bot.inventory.count(620, null)
    return bot.food <= 18 && wheat_count >= 3;
}

async function eat_bread(bot, bread) {
    if (!bot.heldItem || bot.heldItem.type !== 621)
        await bot.Equip(bread, "hand")
    await bot.Consume()
}

module.exports = {need_eat_bread, eat_bread}