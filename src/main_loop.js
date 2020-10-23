// 事件循环的工作过程：通过依次对列表中的函数进行调用，来判断哪个事件可以触发（优先）。
const {think_of_harvest, test_good_crop_exist} = require('./crop_cutter')
const {get_seed_and_wheat_entity, think_of_picking_up} = require('./picker')
const {check_need_plant, think_of_planting} = require('./planter')

function start(bot) {
    let executing = false
    let current_executing = () => {}
    bot.on("move", () => {
        try{
            current_executing()
        } catch (e) {
            console.error(current_executing)
        }
    })
    // 主循环
    setInterval(() => {
        if (!executing) {
            executing = true
            let test_good_crop = test_good_crop_exist(bot)
            if (test_good_crop) {
                current_executing = think_of_harvest(bot, test_good_crop, () => executing = false)
                return
            }
            let crop_entity = get_seed_and_wheat_entity(bot)
            if (crop_entity) {
                current_executing = think_of_picking_up(bot, crop_entity.position, () => executing = false)
                return
            }
            let empty_plant_plough = check_need_plant(bot)
            if (empty_plant_plough) {
                current_executing = think_of_planting(bot,empty_plant_plough,() => executing = false)
                return
            }
        executing = false
        }
    }, 1000)
}

module.exports = start