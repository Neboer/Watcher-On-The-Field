const Movements = require('mineflayer-pathfinder').Movements
const {GoalXZ} = require('mineflayer-pathfinder').goals

function go_there(bot, target_position){
    let mcdata = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcdata)
    defaultMove.blocksCantBreak.add(619)
    defaultMove.blocksToAvoid.add(619)
    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalXZ(target_position.x, target_position.z))
}

module.exports = {go_there}