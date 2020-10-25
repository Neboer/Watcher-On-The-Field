const mineflayer = require('mineflayer')
const earlyHook = require('./hooks')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const {keep_find_a_work_and_do} = require('./works')
const v8 = require('v8');

const structuredClone = obj => {
    return v8.deserialize(v8.serialize(obj));
};
let name_list = ["bot1", "bot2", "bot3"]

let option_item = {
    host: 'localhost',
    port: 4949,
    version: '1.16.3',
    viewDistance: "far"
}

const bots = []

for (let i of name_list) {
    let this_option = structuredClone(option_item)
    this_option.username = i
    bots.push(mineflayer.createBot(this_option))
}

for (let bot of bots) {
    bot.loadPlugin(pathfinder)
    bot.on("login", () => {
        earlyHook(bot)
        keep_find_a_work_and_do(bot, 1000)
    })
}