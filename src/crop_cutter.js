const {calculate_the_diff_of_coordinate} = require('./libs')

function think_of_harvest(bot, target_block, cb) {
    let target_is_dig = false
    let work_is_finished = false
    let init_cd = calculate_the_diff_of_coordinate(bot, target_block)
    bot.lookAt(target_block.position, false,() => bot.setControlState("forward", true))
    return function () {
        if (!work_is_finished) {
            if (!target_is_dig) {
                if (bot.canDigBlock(target_block)) {
                    try {
                        bot.dig(target_block)
                    } catch (err) {
                        console.error(err)
                    }
                    target_is_dig = true
                }
            }
            let curr_cd = calculate_the_diff_of_coordinate(bot, target_block)
            if (init_cd[0] * curr_cd[0] < 0 || init_cd[1] * curr_cd[1] < 0 || bot.entity.position.distanceTo(target_block.position) <= 0.5) {
                work_is_finished = true
                bot.clearControlStates()
                cb()
            }
        }
    }
}

function test_good_crop_exist(bot) {
    return bot.findBlock({
        matching: block => {
            return (block.name === 'wheat' && block.stateId === 3364)
        }
    })
}

module.exports = {think_of_harvest, test_good_crop_exist}