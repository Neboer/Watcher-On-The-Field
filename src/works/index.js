const {get_game_section} = require('./get_game_section')
const analyse_a_section_and_make_decision = require('./make_a_decision')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function start_event_loop(bot, timeout) {
    while (true) {
        let section = get_game_section(bot)
        let action = analyse_a_section_and_make_decision(section)
        console.log(action[0].name)
        try {
            await action[0](...action.slice(1))
        } catch (e) {
            console.error(e)
        }
        await wait(timeout)
    }
}

module.exports = start_event_loop