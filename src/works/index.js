const {check_can_plant_seed, plant_seed} = require('./planter')
const {test_good_crop_exist, cut_target_crop} = require('./cutter')
const {get_item_on_ground, pickup} = require('./picker')
const {crafting_table_exist_and_has_enough_wheat, craft_wheat} = require('./crafter')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function keep_find_a_work_and_do(bot, timeout) {
    while (true) {
        try {
            let block = await check_can_plant_seed(bot)
            if (block) await plant_seed(bot, block)
            let good_crop = await test_good_crop_exist(bot)
            if (good_crop) await cut_target_crop(bot, good_crop)
            let item = await get_item_on_ground(bot)
            if (item) await pickup(bot, item)
            let cf_table = await crafting_table_exist_and_has_enough_wheat(bot)
            if (cf_table) await craft_wheat(bot, cf_table)
            await wait(timeout)
        } catch (e) {
            console.log(e)
            continue
        }
    }
}

module.exports = {keep_find_a_work_and_do}