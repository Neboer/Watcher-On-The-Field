function get_good_wheat(bot) {
    let harvesting = false
    let block_mission = {
        target_block: null, target_is_dig: false, active: false, original_corr_diff: 0
    }
    bot.on("move", function () {
        if (block_mission.active) {
            if (!block_mission.target_is_dig) {
                if (bot.canDigBlock(block_mission.target_block)) {
                    bot.dig(block_mission.target_block)
                    block_mission.target_is_dig = true
                }
            }
            if ((bot.entity.position.x - block_mission.target_block.position.x) * block_mission.original_corr_diff[0] < 0 ||
                (bot.entity.position.z - block_mission.target_block.position.z) * block_mission.original_corr_diff[1] < 0) {
                bot.clearControlStates()
                block_mission.target_block = null
                block_mission.active = false
                harvesting = false
            }
        }
    })

    setInterval(point => {
        let target_block = bot.findBlock({
            matching: block => {
                return (block.name === 'wheat' && block.stateId === 3364)
            }
        })
        if (target_block && !harvesting) {
            harvesting = true
            walk_to_wheat_and_harvest(bot, block_mission, target_block)
        }
    }, 5000)

}

function walk_to_wheat_and_harvest(bot, mission, target_block) {
    bot.lookAt(target_block.position)
    mission.target_block = target_block
    mission.original_corr_diff = [bot.entity.position.x - target_block.position.x, bot.entity.position.z - target_block.position.z]
    mission.target_is_dig = false
    mission.active = true
    bot.setControlState('forward', true)
}

// function walk_to_place_the_seed(bot, )

module.exports = get_good_wheat