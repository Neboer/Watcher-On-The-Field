const Movements = require('mineflayer-pathfinder').Movements
const {GoalXZ, GoalNear} = require('mineflayer-pathfinder').goals

const mcData = require('minecraft-data')("1.16.3")
let defaultMove = null
let on_goal_reached = new Function()

function register_bot_move(bot) {
    bot.on('goal_reached', () => {
        on_goal_reached()
    })
    defaultMove = new Movements(bot, mcData)
}

function go(bot, target_position, distance) {
    if (bot.entity.position.distanceTo(target_position) <= distance) return new Promise(res => {
        res()
    })
    let goal = distance === 0 ? new GoalXZ(target_position.x, target_position.z) : new GoalNear(target_position.x, target_position.y, target_position.z, distance)
    return new Promise((resolve) => {
        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(goal)
        on_goal_reached = resolve
    })
}

module.exports = {register_bot_move, go}