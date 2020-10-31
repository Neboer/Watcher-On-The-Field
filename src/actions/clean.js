// 持续堆肥/做干草块，直到...

async function badly_pile_seed(bot, composter) {// 持续堆肥以清空物品栏里的小麦种子
    await bot.go(composter.position, 3)
    do {
        let wheat_seed = bot.inventory.findInventoryItem(619, null, false)
        bot.equip(wheat_seed, "hand", () => bot.activateBlock(composter))
        await bot.wait(300)
    } while (bot.inventory.count(619, null) > 64)
}

async function badly_make_hey(bot, cf_table) {// 持续做小麦以清空物品栏里的小麦
    await bot.go(cf_table.position, 3)
    let recipe = bot.recipesFor(349, null, 1, cf_table)[0]
    do {
        await bot.Craft(recipe, 1, cf_table)
        await bot.wait(300)
    } while (bot.inventory.count(620, null) > 9)
}

module.exports = {badly_make_hey, badly_pile_seed}