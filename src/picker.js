const {go_there} = require('./libs')

function get_seed_and_wheat_entity(bot) {
    return bot.nearestEntity(entity => {
        return (entity.name === 'item')
    })
}

function think_of_picking_up(bot, target_corr, cb) {
    let work_is_finished = false
    go_there(bot, target_corr)
    return function () {
        if (!work_is_finished) {
            if (target_corr.distanceTo(bot.entity.position) <= 1) {
                work_is_finished = true
                cb()
            }
        }
    }
}

module.exports = {get_seed_and_wheat_entity, think_of_picking_up}