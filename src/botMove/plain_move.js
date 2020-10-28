function distant_to(bot, target_pos) {
    let c = bot.entity.position // current position
    let t = target_pos
    return Math.sqrt((t.x - c.x) * (t.x - c.x) + (t.z - c.z) * (t.z - c.z))
}

function bind_reach_and_move(bot) {
    // let target_position = null
    // let after_reach_target = new Function()
    // let distance_to_target = 0
    // let last_distance = null
    // bot.on('move', () => {
    //     if (target_position) {
    //         let current_distance = distant_to(bot, target_position)
    //         if (last_distance) {
    //             if (current_distance > last_distance || current_distance <= distance_to_target) {// 判断抵达目的地
    //                 bot.clearControlStates()
    //                 target_position = null
    //                 last_distance = null
    //                 after_reach_target()
    //                 bot.clearControlStates()
    //             } else {
    //                 last_distance = current_distance
    //             }
    //         } else {
    //             last_distance = current_distance
    //         }
    //     }
    // })
    bot.go = function (pos, distance) {
        bot.clearControlStates()
        if (distant_to(bot, pos) <= distance) return new Promise(resolve => resolve())
        // distance_to_target = distance
        return new Promise((resolve) => {
            bot.lookAt(pos, false, () => {
                bot.setControlState('forward', true)
                setTimeout(() => {
                    bot.clearControlStates();
                    resolve()
                }, (distant_to(bot, pos) - distance) * 250)
            })
        })
    }
}

module.exports = bind_reach_and_move