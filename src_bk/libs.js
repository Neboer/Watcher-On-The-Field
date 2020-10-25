const Movements = require('mineflayer-pathfinder').Movements
const {GoalXZ, GoalNear} = require('mineflayer-pathfinder').goals

let mcData = require('minecraft-data')("1.16.3")
const defaultMove = new Movements(bot, mcData)
let on_goal_reached = new Function()

function bind_bot_reach_callback(bot) {
    bot.on('goal_reached', () => {on_goal_reached()})
}

function go_there(bot, target_position, on_reached) {
    on_goal_reached = on_reached
    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalXZ(target_position.x, target_position.z), false)
}

function go_near(bot, target_position, distance, on_reached) {
    on_goal_reached = on_reached
    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(target_position.x, target_position.y, target_position.z, distance))
}

module.exports = {go_there, go_near, bind_bot_reach_callback}