const Vec3 = require('vec3')

let bot

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    bind_bot(a_bot) {
        bot = a_bot
    },
    // 催熟指定的小麦
    async maturation(target_wheat) {
        await bot.go(target_wheat.position, 4)
        let bone_meal = bot.inventory.findInventoryItem(712, null, false)
        await bot.Equip(bone_meal, "hand")
        await bot.ActivateBlock(target_wheat)
    },
    // 打掉目标作物
    async cut_good_wheat(target_wheat) {
        await bot.go(target_wheat.position, 4)
        await bot.Dig(target_wheat)
    },
    // 种种子
    async plant_seed_on(target_plough) {
        let seed = bot.inventory.findInventoryItem(619, null, false)
        await bot.Equip(seed, "hand")
        await bot.go(target_plough.position, 4)
        await bot.PlaceBlock(target_plough, new Vec3(0, 1, 0))
    },
    // 做1个面包
    async craft_bread(crafting_table) {
        await bot.go(crafting_table.position, 2)
        let recipe = bot.recipesFor(621, null, 1, crafting_table)[0]
        await bot.Craft(recipe, 1, crafting_table)
    },
    // 吃1个身上的面包
    async eat_bread() {
        let bread = bot.inventory.findInventoryItem(621, null, true)
        await bot.Equip(bread, "hand")
        await bot.Consume()
    },
    // 大量的多做干草捆
    async make_hey(crafting_table, count) {
        await bot.go(crafting_table.position, 2)
        let recipe = bot.recipesFor(349, null, 1, crafting_table)[0]
        await bot.Craft(recipe, count, crafting_table)
    },
    // 堆肥
    async pile_bone_meal(composter, count) {
        await bot.go(composter.position, 4)
        for (let i = 1; i <= count; i++) {
            let wheat_seed = bot.inventory.findInventoryItem(619, null, false)
            bot.equip(wheat_seed, "hand", () => bot.activateBlock(composter))
            await wait(500)
        }
    },
    // 捡起地上散落的物品
    async pick_up(item) {
        await bot.go(item.position, 0)
    },
    // 移动到场地的中央
    async move_to_center(center) {
        await bot.go(center, 2)
    }
}