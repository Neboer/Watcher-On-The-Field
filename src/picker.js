const {calculate_the_diff_of_coordinate} = require('./libs')

function get_seed_and_wheat_entity(bot) {
    return bot.nearestEntity(entity => {
        return (entity.name === 'item' && (entity.id === 107 || entity.id === 110))
    })
}

function think_of_picking_up(bot, target_corr, cb){
    let work_is_finished = false
    let init_cd = calculate_the_diff_of_coordinate(bot, target_corr)
    bot.setControlState("forward", true)
    return function () {
        if (!work_is_finished) {
            let curr_cd = calculate_the_diff_of_coordinate(bot, target_block)
            if (init_cd[0] * curr_cd[0] < 0 || init_cd[1] * curr_cd[1] < 0 || bot.entity.position.distanceTo(target_block.position) <= 3) {
                work_is_finished = true
                bot.clearControlStates()
                cb()
            }
        }
    }
}

module.exports = {get_seed_and_wheat_entity, think_of_picking_up}