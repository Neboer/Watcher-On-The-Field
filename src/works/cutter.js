const in_range = require('../hooks/range')

async function test_good_crop_exist(bot) {
    let good_wheat_corr_list = bot.findBlocks({
        matching: block => {
            return (block.name === 'wheat' && block.stateId === 3364)
        },
        count: 500
    })
    if (good_wheat_corr_list.length > 0) {
        for (let i = 0; i < good_wheat_corr_list.length; i++) {
            let wheat_corr = good_wheat_corr_list[i]
            if (in_range(wheat_corr)) return bot.blockAt(good_wheat_corr_list[i])
        }
        return null
    } else return null
}

async function cut_target_crop(bot, target_wheat_block) {
    await bot.go(target_wheat_block.position, 2)
    await bot.Dig(target_wheat_block)
}

module.exports = {test_good_crop_exist, cut_target_crop}

