const {Vec3} = require('vec3')
const {go_there} = require("./libs")

// 检查机器人是否可以拿一个种子。如果可以，则拿一个。
function held_a_seed(bot, cb) {
    let hand_position_slot = 36 + bot.quickBarSlot
    let an_empty_slot = -1
    let an_seed_slot = -1
    for (let i = 9; i <= 44; i++) {
        if (bot.inventory.slots[i] === null) {
            an_empty_slot = i
        } else if (bot.inventory.slots[i].type === 619) {
            an_seed_slot = i
        }
        if (an_empty_slot !== -1 && an_seed_slot !== -1) break
    }
    if (an_seed_slot === -1 || an_seed_slot === -1) return false
    if (bot.inventory.slots[hand_position_slot] === null) {
        bot.moveSlotItem(an_seed_slot, hand_position_slot, cb)
    } else if (bot.inventory.slots[hand_position_slot].type !== 619) {
        bot.moveSlotItem(hand_position_slot, an_empty_slot, () => {
            bot.moveSlotItem(an_seed_slot, hand_position_slot, cb)
        })
    } else {
        cb()
    }
    return true
}

function check_need_plant(bot) {
    let seed_item = bot.inventory.findInventoryItem(619, null, false)
    if (seed_item === null) {
        return null
    }
    let ploughs_corr_list = bot.findBlocks({
        matching: block => {
            return (block.name === 'farmland')
        },
        count: 100
    })
    if (ploughs_corr_list.length > 0) {
        for (let i = 0; i < ploughs_corr_list.length; i++) {
            let plough_corr = ploughs_corr_list[i]
            let maybe_seed_block = bot.blockAt(plough_corr.plus(new Vec3(0, 1, 0)))
            if (maybe_seed_block.name === "air") return bot.blockAt(plough_corr) // 如果找到了一个表面上没东西的耕地，则返回耕地块。
        }
        return null
    } else return null
}


function think_of_planting(bot, plough_block, cb) {
    if (!held_a_seed(bot, () => {
    })) {
        cb()
        return function () {
        }
    } else {
        let planting = false
        let confirm_planted = false
        let last_plant_time = new Date()
        go_there(bot, plough_block.position)
        return function () {
            if (!confirm_planted) {
                if (!planting) {
                    // 这个回调有可能永远不会被调用，因此必须给这个函数设置一个超时的功能。
                    bot.placeBlock(plough_block, new Vec3(0, 1, 0), (err) => {
                        if (err) {
                            planting = false
                        }
                        else {
                            confirm_planted = true;
                            cb()
                        }
                    })
                    planting = true
                }
            }
        }
    }
}

module.exports = {check_need_plant, think_of_planting}