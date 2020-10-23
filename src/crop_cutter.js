const {go_there} = require("./libs")

function think_of_harvest(bot, target_block, cb) {
    let target_is_dig = false
    let work_is_finished = false
    go_there(bot, target_block.position)
    return function () {
        if (!work_is_finished) {
            if (!target_is_dig) {
                if (bot.canDigBlock(target_block)) {
                    bot.dig(target_block)
                    target_is_dig = true
                }
            }
            if (target_block.position.distanceTo(bot.entity.position) <= 1) {
                work_is_finished = true
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