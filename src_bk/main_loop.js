// 事件循环的工作过程：通过依次对列表中的函数进行调用，来判断哪个事件可以触发（优先）。
const {think_of_harvest, test_good_crop_exist} = require('./works/crop_cutter')
const {get_seed_and_wheat_entity, think_of_picking_up} = require('./works/picker')
const {check_need_plant, think_of_planting} = require('./works/planter')
const {have_enough_wheat_to_produce_hay, think_of_craft} = require('./works/crafter')


function start(bot) {
    let executing = false
    let current_executing = () => {}
    let current_task_name = ""
    let equipping = false

    function change_hand_held_item(item) {
        if (/*!equipping &&*/ (!item || item.type !== 619)) {
            let seed = bot.inventory.findInventoryItem(619, null, false)
            if (seed !== null) {
                equipping = true
                bot.equip(seed, "hand", () => {
                    equipping = false
                })
            }
        }
    }

    setInterval(() => {
        current_executing()
    }, 100)

    bot.on("heldItemChanged", change_hand_held_item)
    bot.on('goal_reached', (goal) => {
        console.log('Here I am !')
    })
    // 主循环
    setInterval(() => {
        if (!executing) {
            executing = true
            let test_good_crop = test_good_crop_exist(bot)
            if (test_good_crop) {
                current_task_name = `crop cutter want to cut x:${test_good_crop.position.x} z:${test_good_crop.position.z}`
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
                current_task_name = "planter"
                current_executing = think_of_planting(bot, empty_plant_plough, () => executing = false)
                return
            }
            let craft_block = have_enough_wheat_to_produce_hay(bot)
            if (craft_block) {
                current_task_name = "crafter"
                current_executing = think_of_craft(bot, craft_block, () => executing = false)
                return
            }
            executing = false
        }
    }, 1000)
    return {
        stop_exec: function () {
            executing = false
        },
        curr_exec: function (){return current_task_name}
    }
}

module.exports = start