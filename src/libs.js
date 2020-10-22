function calculate_the_diff_of_coordinate(bot, block) {
    return [bot.entity.position.x - block.position.x,
        bot.entity.position.z - block.position.z]
}

module.exports = {calculate_the_diff_of_coordinate}