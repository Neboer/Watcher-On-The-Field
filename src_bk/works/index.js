const {think_of_harvest, test_good_crop_exist} = require('./crop_cutter')
const {get_seed_and_wheat_entity, think_of_picking_up} = require('./picker')
const {check_need_plant, think_of_planting} = require('./planter')
const {have_enough_wheat_to_produce_hay, think_of_craft} = require('./crafter')

function trying_to_get_a_work_to_do(bot){
    if (test_good_crop_exist(bot)) return think_of_harvest
    if (get_seed_and_wheat_entity(bot)) return think_of_picking_up
    if (check_need_plant(bot)) return think_of_planting
    if (have_enough_wheat_to_produce_hay(bot)) return think_of_planting
}