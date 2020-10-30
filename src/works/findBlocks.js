const {range: rangeRect, height} = require('../../config')
const Vec3 = require('vec3')

// y height是耕地的高度。小麦在上一层，堆肥桶、工作台都在耕地那一层。机器人正常情况下应该比耕地高一层。
// find_type="empty_farm_land" "good_wheat"熟小麦 "green_wheat"生小麦 "composter"堆肥桶 "craft_table"工作台
// 找到地面上的未成熟小麦块/成熟小麦块和空田地之一。
function find_block_in_layer(bot) {
    let kx = 1, kz = 1
    if (rangeRect[0][0] > rangeRect[1][0]) kx = -1
    if (rangeRect[0][1] > rangeRect[1][1]) kz = -1
    let green_wheat = null, good_wheat = null, empty_block = null;
    for (let x = rangeRect[0][0]; x !== rangeRect[1][0] + kx; x += kx) {
        for (let z = rangeRect[0][1]; z !== rangeRect[1][1] + kz; z += kz) {
            let cb = bot.blockAt(new Vec3(x, height, z));
            let ub = bot.blockAt(new Vec3(x, height + 1, z));
            if (cb && cb.type === 153 && ub && ub.type === 0) empty_block = cb
            if (ub && ub.type === 152 && ub.stateId === 3364) good_wheat = ub
            if (ub && ub.type === 152 && ub.stateId !== 3364) green_wheat = ub
        }
    }
    return {green_wheat, good_wheat, empty_block}
}

// [cb][cb]
function search_all_blocks(bot, id_list) {
    let kx = 1, kz = 1
    if (rangeRect[0][0] > rangeRect[1][0]) kx = -1
    if (rangeRect[0][1] > rangeRect[1][1]) kz = -1
    let result = []
    for (let i = 0; i < id_list.length; i++)
        result.push([])
    for (let x = rangeRect[0][0]; x !== rangeRect[1][0]; x += kx) {
        for (let z = rangeRect[0][1]; z !== rangeRect[1][1]; z += kz) {
            let cb = bot.blockAt(new Vec3(x, height, z));
            if (cb && id_list.includes(cb.type)) {
                let index = id_list.findIndex(_id => _id === cb.type)
                result[index].push(cb)
            }
        }
    }
    return result
}

module.exports = {find_block_in_layer, search_all_blocks}