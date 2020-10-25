const {Vec3} = require('vec3')
const {GoalXZ, GoalNear} = require('mineflayer-pathfinder').goals


function check_need_plant(bot) {
    if (!bot.entity.heldItem || bot.entity.heldItem.type !== 619) return null
    let ploughs_corr_list = bot.findBlocks({
        matching: block => {
            return (block.name === 'farmland')
        },
        count: 100
    })
    if (ploughs_corr_list.length > 0) {
        for (let i = 0; i < ploughs_corr_list.length; i++) {
            let plough_corr = ploughs_corr_list[i]
            let maybe_seed_block = bot.blockAt(plough_corr.plus(new Vec3(0, 1, 0)))
            if (maybe_seed_block.name === "air") return bot.blockAt(plough_corr) // 如果找到了一个表面上没东西的耕地，则返回耕地块。
        }
        return null
    } else return null
}


function think_of_planting(bot, plough_block, cb) {
    let planting = false
    let confirm_planted = false
    let last_plant_time = new Date()
    bot.pathfinder.setGoal(new GoalXZ(plough_block.position.x, plough_block.position.z), false)

    return function () {
        if (!confirm_planted) {
            if (!planting) {
                // 这个回调有可能永远不会被调用，因此必须给这个函数设置一个超时的功能。
                bot.placeBlock(plough_block, new Vec3(0, 1, 0), (err) => {
                    if (err) {
                        planting = false
                    } else {
                        confirm_planted = true;
                        cb()
                    }
                })
                planting = true
            }
        }
    }
}

module.exports = {check_need_plant, think_of_planting}