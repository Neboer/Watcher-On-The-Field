// grab方法。
// 在机器人放置方块之前，通过grab方法可以确保机器人手中正在拿着目标的方块。
// 这个方法会首先判断手中是否掌握这个物品（存在即退出），然后判断物品栏中是否存在这个物品（存在就切换手中物品），最后判断物品是否存在inventory box中（存在即与手中的物品交换）。
// 整个过程尽量避免使用顶层预设的方法。
// const ClickWindow = require('../hooks/force_clickWindow')
//
// let action_count = 1

function grab(bot, item_id) {
    return new Promise((resolve) => {
        if (bot.heldItem && bot.heldItem.type === item_id) resolve()
        else {
            let current_slot = bot.quickBarSlot // 当前的slot, 36是第一个qickbar slot
            let quick_bar_item_id = bot.inventory.slots.slice(36, 45).findIndex(item => {
                return (item && item.type === item_id)
            })
            if (quick_bar_item_id > -1) {
                bot.setQuickBarSlot(quick_bar_item_id)
                bot.updateHeldItem()
                resolve()
            } else {// 物品存在于inventory中。
                for (let i = 0; i < bot.inventory.slots.length; i++) {
                    if (bot.inventory.slots[i] && bot.inventory.slots[i].type === item_id) {
                        bot.equip(bot.inventory.slots[i], "hand", resolve)
                        break
                    }
                }
            }
        }
    })
}

module.exports = grab