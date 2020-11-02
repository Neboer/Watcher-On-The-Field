const {maturation, cut_good_wheat, plant_seed_on, craft_bread, eat_bread, pick_up, move_to_center, craft_9groups_of_wheat_into_1groups_of_hay, badly_pile_seed} = require('../actions')

// 对游戏截面进行分析并下达动作指令的函数，是机器人的大脑。
// 指令的格式是一个数组，第一个是函数，其余是参数。
function analyse_a_section_and_make_decision(game_section) {
    let s = game_section
    if (s.is_hunger && s.bread_count > 0) return [eat_bread]
    if (s.empty_slots_count <= 1)
        if (s.nearest_composter && s.seed_count > 64) return [badly_pile_seed, s.nearest_composter]// 物品栏空间不足，优先堆积。
    if (s.wheat64_group_count >= 9) return [craft_9groups_of_wheat_into_1groups_of_hay, s.nearest_crafting_table]// 有足够整组的小麦，直接打成干草块
    if (s.drop_item) return [pick_up, s.drop_item]
    if (s.powder_count && s.green_wheat_block) return [maturation, s.green_wheat_block]
    // if (s.wheat_count >= 3 && s.bread_count <= 2 && s.nearest_crafting_table) return [craft_bread, s.nearest_crafting_table] 
    if (s.seed_count > 0 && s.empty_field_block) return [plant_seed_on, s.empty_field_block]
    if (s.good_wheat_block) return [cut_good_wheat, s.good_wheat_block]
    // if (s.wheat_count >= 9 && s.nearest_crafting_table) return [make_hey, s.nearest_crafting_table, Math.floor(s.wheat_count / 9)]
    if (s.nearest_composter && s.seed_count > 64) return [badly_pile_seed, s.nearest_composter, s.seed_count - 64]
    return [move_to_center, s.center]
}

module.exports = analyse_a_section_and_make_decision
