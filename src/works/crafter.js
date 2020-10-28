async function crafting_table_exist_and_has_enough_wheat(bot, wheat_count) {
    // 检查是否有足够多的小麦制作干草块
    let count = bot.inventory.count(620, null)
    let cf_table = bot.findBlock({matching: 151})// crafting table 151
    if (count >= wheat_count && cf_table !== null) {
        return cf_table
    } else {
        return null
    }
}

async function craft_wheat(bot, cf_table) {
    await bot.go(cf_table.position, 1)
    let recipe = bot.recipesFor(349, null, 1, cf_table)[0]
    // let wheat_count = bot.inventory.count(620, null)
    // bot.craft(recipe, 1, cf_table, (e) => {if (e) console.error(e)})
    await bot.Craft(recipe, 1, cf_table)
}

async function craft_food(bot, cf_table) {
    await bot.go(cf_table.position, 1)
    let recipe = bot.recipesFor(621, null, 1, cf_table)[0]
    await bot.Craft(recipe, 1, cf_table)
    return bot.inventory.findInventoryItem(621, null, false)

}

module.exports = {crafting_table_exist_and_has_enough_wheat, craft_wheat, craft_food}