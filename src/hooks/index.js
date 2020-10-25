/* 有一些函数需要升级为高级函数。需要升级的函数有：dig -> Dig, placeBlock -> PlaceBlock, equip -> Equip */
/* 有一些函数需要原名bind到bot对象上，botMove里的go。*/
const {go, register_bot_move} = require('../botMove')
const keepDoing = require('./keep_trying')
const cbConverter = require('./callback_converter')


function early_hooks(bot) {
    register_bot_move(bot)
    bot.go = (targetPosition, distance) => {
        go(bot, targetPosition, distance)
    }
    bot.equip = (function () {
        let ori_equ = bot.equip
        return function (item, position, cb) {
            if (item && item.type === 619) ori_equ(item, position, cb)
            else cb()
        }
    })()
    // 修改dig，这类函数还需要因为有寻路系统存在。
    bot.dig = (function () {
        let ori_dig = bot.dig
        return function (target_block, cb) {
            if (target_block.name === 'wheat' && target_block.stateId === 3364) ori_dig(target_block, cb)
            else cb()
        }
    })()
    // 执行此函数会当场执行数次命令并返回promise
    bot.Dig = (...params) => keepDoing(cbConverter(bot.dig, 1000), params, 3)
    bot.PlaceBlock = (...params) => keepDoing(cbConverter(bot.placeBlock, 1000), params, 3)
    bot.Equip = (...params) => keepDoing(cbConverter(bot.equip, 1000), params, 3)
}

module.exports = early_hooks