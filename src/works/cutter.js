async function test_good_crop_exist(bot) {
    return bot.findBlock({
        matching: block => {
            return (block.name === 'wheat' && block.stateId === 3364)
        }
    })
}

async function cut_target_crop(bot, target_wheat_block){
    await bot.go(target_wheat_block.position, 4)
    await bot.Dig(target_wheat_block)
}

module.exports = {test_good_crop_exist, cut_target_crop}

