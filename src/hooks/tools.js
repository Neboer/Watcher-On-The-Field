const vec3 = require('vec3')

function distant_to(bot, target_pos) {
    let c = bot.entity.position // current position
    let t = target_pos
    return Math.sqrt((t.x - c.x) * (t.x - c.x) + (t.z - c.z) * (t.z - c.z))
}

function find_nearest_block(bot, block_list) {
    let nearest_block = block_list[0]
    for (let i = 0; i < block_list.length; i++) {
        if (distant_to(bot, block_list[i]) < distant_to(bot, nearest_block)) nearest_block = block_list[i]
    }
    return nearest_block
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

// async function use_composter(bot, composter_block){
//
// }
//
// async function use_bone_meal(bot, wheat_block){
//
// }

module.exports ={distant_to, find_nearest_block, wait}