// 获得当前的游戏状态，包括关键物品的数量等。
const {height, range} = require('../../config')
const {find_block_in_layer, search_all_blocks} = require('./findBlocks')
const in_range = require('./range')
const Vec3 = require('vec3')


// 在机器人第一次登录稳定之后执行此函数。一般来讲这个game scene是不会变化的。
function get_game_scene(bot) {
    let items = search_all_blocks(bot, [728, 151])// 堆肥桶，工作台
    bot.crafting_tables = items[1]
    bot.composters = items[0]
}

// 在每次事件循环之前都执行此函数，获取游戏的状态
function get_game_section(bot) {
    let count = (id) => {
        return bot.inventory.count(id, null)
    }

    let items = find_block_in_layer(bot)
    return {
        wheat_count: count(620),
        bread_count: count(621),
        seed_count: count(619),// 小麦种子
        powder_count: count(712), // 骨粉
        is_hunger: bot.food <= 18,
        height: height,// 耕地高度
        square: Math.abs((range[1][0] - range[0][0]) * (range[1][1] - range[0][1])),// 小麦田面积
        nearest_crafting_table: bot.find_nearest_block(bot.crafting_tables),
        nearest_composter: bot.find_nearest_block(bot.composters),
        green_wheat_block: items.green_wheat,
        good_wheat_block: items.good_wheat,
        empty_field_block: items.empty_block,
        drop_item: bot.nearestEntity(entity => {
            return (entity.name === 'item' && in_range(entity.position) && Math.abs(entity.position.y - bot.entity.position.y) < 0.1)
        }),
        center: new Vec3(Math.round((range[0][0] + range[1][0]) / 2), height, Math.round((range[0][1] + range[1][1]) / 2))
    }
}

module.exports = {get_game_scene, get_game_section}