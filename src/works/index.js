const {check_can_plant_seed, plant_seed} = require('./planter')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function keep_find_a_work_and_do(bot, timeout) {
    while (true){
        try {
            let block = await check_can_plant_seed(bot)
            if (block) {
                await plant_seed(bot, block)
            }
            await wait(timeout)
        } catch (e) {
            continue
        }
    }
}

module.exports = {keep_find_a_work_and_do}