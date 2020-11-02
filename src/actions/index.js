const Vec3 = require('vec3')
const {craft_9groups_of_wheat_into_1groups_of_hay, cf_bind_bot}  = require('./crafting_table')
const _badly_pile_seeds = require('./pile_seeds')
let bot

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    bind_bot(a_bot) {
        cf_bind_bot(a_bot)
        bot = a_bot
    },
    // 催熟指定的小麦
    async maturation(target_wheat) {
        await bot.go(target_wheat.position, 4)
        await bot.Grab(712)
        await bot.ActivateBlock(target_wheat)
    },
    // 打掉目标作物
    async cut_good_wheat(target_wheat) {
        await bot.go(target_wheat.position, 4)
        await bot.Dig(target_wheat)
    },
    // 种种子
    async plant_seed_on(target_plough) {
        await bot.go(target_plough.position, 4)
        await bot.Grab(619)
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
        bot.logger.info('eat bread.')
        await bot.Grab(621)
        await bot.Consume()
    },
    craft_9groups_of_wheat_into_1groups_of_hay,
    // // 做count个干草捆
    // async make_hey(crafting_table, count) {
    //     await bot.go(crafting_table.position, 2)
    //     let recipe = bot.recipesFor(349, null, 1, crafting_table)[0]
    //     await bot.Craft(recipe, count, crafting_table)
    // },
    // 堆count次肥
    // async badly_pile_seed(composter) {// 持续堆肥以清空物品栏里的小麦种子
    //     bot.logger.info('start pile seeds make bone meal')
    //     await bot.go(composter.position, 3)
    //     do {
    //         let wheat_seed = bot.inventory.findInventoryItem(619, null, false)
    //         bot.equip(wheat_seed, "hand", () =>
    //             bot.activateBlock(composter))
    //         await bot.wait(100)
    //     } while (bot.inventory.count(619, null) > 64)
    //     bot.logger.info('piling seeds complete')
    // },
    async badly_pile_seed(composter) {
      await _badly_pile_seeds(bot, composter, 0)
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