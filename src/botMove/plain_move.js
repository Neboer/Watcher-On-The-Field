function bind_reach_and_move(bot) {
    bot.go = function (pos, distance) {
        bot.clearControlStates()
        if (bot.distant_to(pos) <= distance) return new Promise(resolve => resolve())
        return new Promise((resolve) => {
            bot.lookAt(pos, false, () => {
                bot.setControlState('forward', true)
                setTimeout(() => {
                    bot.clearControlStates();
                    resolve()
                }, (bot.distant_to(pos) - distance) * 250)
            })
        })
    }
}

module.exports = bind_reach_and_move