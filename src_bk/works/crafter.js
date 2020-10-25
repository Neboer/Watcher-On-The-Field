const {Vec3} = require('vec3')
const {go_near} = require('../libs')

// 在空闲的时候，尽可能多的把背包里的小麦做成干草块。
function have_enough_wheat_to_produce_hay(bot) {
    // 检查是否有足够多的小麦制作干草块
    let count = bot.inventory.count(620, null)
    let cf_table = bot.findBlock({matching: 151})// crafting table 151
    if (count >= 9 && cf_table !== null) {
        return cf_table
    } else {
        return null
    }
}

function craft(bot, cf_table, cb) {
    let recipe = bot.recipesFor(349, null, 1, cf_table)[0]
    let wheat_count = bot.inventory.count(620, null)
    bot.craft(recipe, Math.floor(wheat_count / 9), cf_table, (err) => {
        if (err) cb(err)
        else cb()
    })
}

function think_of_craft(bot, cf_table, cb) {
    go_near(bot,cf_table.position, )
    bot.pathfinder.setGoal(new GoalNear(cf_table.position.x, cf_table.position.y, cf_table.position.z, 1), false)
    let work_finished = false
    return function () {
        if (!work_finished) {
            if (bot.entity.position.distanceTo(cf_table.position) <= 2) {
                work_finished = true
                craft(bot, cf_table, err => {
                    if (err) work_finished = false
                    else {
                        work_finished = true
                        cb()
                    }
                })
            }
        }
    }
}

module.exports = {have_enough_wheat_to_produce_hay, think_of_craft}