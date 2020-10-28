const {Vec3} = require('vec3')
const in_range = require('../hooks/range')

async function check_can_plant_seed(bot) {
    let has_seed = bot.inventory.findInventoryItem(619, null, false)
    if (!has_seed) return null
    let ploughs_corr_list = bot.findBlocks({
        matching: block => {
            return (block.name === 'farmland')
        },
        count: 500
    })
    if (ploughs_corr_list.length > 0) {
        for (let i = 0; i < ploughs_corr_list.length; i++) {
            let plough_corr = ploughs_corr_list[i]
            if (!in_range(plough_corr)) continue
            let maybe_seed_block = bot.blockAt(plough_corr.plus(new Vec3(0, 1, 0)))
            if (maybe_seed_block.name === "air") return bot.blockAt(plough_corr) // 如果找到了一个表面上没东西的耕地，则返回耕地块。
        }
        return null
    } else return null
}

async function plant_seed(bot, plough_block) {
    let seed = bot.inventory.findInventoryItem(619, null, false)
    await bot.Equip(seed, "hand")
    await bot.go(plough_block.position, 2)
    await bot.PlaceBlock(plough_block, new Vec3(0, 1, 0))
}

module.exports = {check_can_plant_seed, plant_seed}