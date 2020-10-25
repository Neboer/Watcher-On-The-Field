const {go_there, go_near, is_bot_stop} = require('../libs')
const {GoalXZ, GoalNear} = require('mineflayer-pathfinder').goals


function get_seed_and_wheat_entity(bot) {
    return bot.nearestEntity(entity => {
        return (entity.name === 'item')
    })
}

function think_of_picking_up(bot, target_corr, cb) {
    let work_is_finished = false
    // console.log('\x1b[36m%s\x1b[0m', target_corr)
    bot.pathfinder.setGoal(new GoalXZ(target_corr.x, target_corr.z), false)
    return function () {
        if (!work_is_finished) {
            if (is_bot_stop(bot) && target_corr.distanceTo(bot.entity.position) <= 1) {
                work_is_finished = true
                cb()
            }
        }
    }
}

module.exports = {get_seed_and_wheat_entity, think_of_picking_up}