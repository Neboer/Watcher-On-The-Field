async function crafting_table_exist_and_has_enough_wheat(bot) {
    // 检查是否有足够多的小麦制作干草块
    let count = bot.inventory.count(620, null)
    let cf_table = bot.findBlock({matching: 151})// crafting table 151
    if (count >= 9 && cf_table !== null) {
        return cf_table
    } else {
        return null
    }
}

async function craft_wheat(bot, cf_table) {
    await bot.go(cf_table.position, 1)
    let recipe = bot.recipesFor(349, null, 1, cf_table)[0]
    let wheat_count = bot.inventory.count(620, null)
    bot.craft(recipe, 1, cf_table, (e) => {if (e) console.error(e)})
    // await bot.Craft(recipe, Math.floor(wheat_count / 9), cf_table)
}

module.exports = {crafting_table_exist_and_has_enough_wheat, craft_wheat}