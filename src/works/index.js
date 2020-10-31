const {get_game_section} = require('./get_game_section')
const analyse_a_section_and_make_decision = require('./make_a_decision')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function start_event_loop(bot, timeout) {
    bot.logger.info('start event loop')
    while (true) {
        let release = await bot.mutex.acquire() // 防止和事件循环产生冲突，锁住机器人
        let section = get_game_section(bot)
        let action = analyse_a_section_and_make_decision(section)
        bot.logger.verbose(action[0].name)
        try {
            await action[0](...action.slice(1))
        } catch (e) {
            bot.logger.error(e)
        }
        release()
        await wait(timeout)
    }
}

module.exports = start_event_loop