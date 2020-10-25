const {GoalXZ, GoalNear} = require('mineflayer-pathfinder').goals

function think_of_harvest(bot, target_block, cb) {
    let complete = false
    let target_is_dig = false
    bot.pathfinder.setGoal(new GoalXZ(target_block.position.x, target_block.position.z), false)
    return function () {
        if (!complete && !target_is_dig) {
            if (bot.canDigBlock(target_block)) {
                bot.dig(target_block, (err) => {
                    if (err) {console.log(err); target_is_dig = false}
                    else {
                        complete = true
                        cb()
                    }
                })
                target_is_dig = true
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