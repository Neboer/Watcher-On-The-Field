/* 有一些函数需要升级为高级函数。需要升级的函数有：dig -> Dig, placeBlock -> PlaceBlock, equip -> Equip */
/* 有一些函数需要原名bind到bot对象上，botMove里的go。*/
const bind_reach_move = require('../botMove/plain_move')
const keepDoing = require('./keep_trying')
const cbConverter = require('./callback_converter')
const {distant_to, find_nearest_block, wait} = require('./tools')
const {bind_bot: action_bind_bot} = require('../actions')
const {get_game_scene} = require('../works/get_game_section')

function early_hooks(bot) {
    bot.wait = wait
    bot.Dig = (...params) => keepDoing(cbConverter(bot.dig, 1000), params, 3)
    bot.PlaceBlock = (...params) => keepDoing(cbConverter(bot.placeBlock, 1000), params, 3)
    bot.Equip = (...params) => keepDoing(cbConverter(bot.equip, 1000), params, 3)
    bot.Craft = async (recipe, count, cf_table) => {
        bot.craft(recipe, count, cf_table, (e) => {if (e) console.error('ce')})
        await bot.wait(1000)
    }
    bot.Consume = cbConverter(bot.consume, 0)
    bot.ActivateBlock = cbConverter(bot.activateBlock, 1000)
    action_bind_bot(bot)
    bot.distant_to = function (target_pos) {
        return distant_to(bot, target_pos)
    }
    bot.find_nearest_block = function (block_list) {
        return find_nearest_block(bot, block_list)
    }

}

function late_hooks(bot) {
    get_game_scene(bot)
    bind_reach_move(bot)
}

module.exports = {early_hooks, late_hooks}