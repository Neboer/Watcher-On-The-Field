const mineflayer = require('mineflayer')
const start = require('./main_loop')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const inventoryViewer = require('mineflayer-web-inventory')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const Movements = require('mineflayer-pathfinder').Movements
const {bind_bot_reach_callback} = require('./libs')


const bot = mineflayer.createBot({
    host: 'localhost',
    port: 1195,
    username: 'Labor',
    version: '1.16.3',
    viewDistance: "tiny"
})

// inventoryViewer(bot)

bot.dig = (function () {
    let unsafe_dig = bot.dig
    return function (block, cb) {
        if (block.name === 'wheat' && block.stateId === 3364) {
            let executing = false
            let timeout_error = new Error("timeout")
            try {
                unsafe_dig(block, () => {
                    executing = true
                    cb()
                })
            } catch (e) {
            }
            setTimeout(() => {
                if (!executing) cb(timeout_error)
            }, 1000)
        } else {
            cb()
        }
    }
})()

// 注意：改变了此函数的执行，这样当操作超时的时候默认操作时失败的。
bot.placeBlock = (function () {
    let bad_placeBlock = bot.placeBlock
    return function (referenceBlock, faceVector, cb) {
        let executing_is_finished = false
        let timeout_error = new Error("timeout")
        bad_placeBlock(referenceBlock, faceVector, () => {
            executing_is_finished = true
            cb()
        })
        setTimeout(() => {
            if (!executing_is_finished) cb(timeout_error)
        }, 1000)
    }
})()

bot.craft = (function () {
    let bad_craft = bot.craft
    return function (recipe, count, crafting_table, cb) {
        let executing_is_finished = false
        let timeout_error = new Error("timeout")
        bad_craft(recipe, count, crafting_table, () => {
            executing_is_finished = true
            cb()
        })
        setTimeout(() => {
            if (!executing_is_finished) cb(timeout_error)
        }, 1000)
    }
})()

bot.loadPlugin(pathfinder)

bind_bot_reach_callback(bot)

bot.on("login", () => {
    mineflayerViewer(bot, {port: 3001})
    let {stop_exec, curr_exec} = start(bot)
    bot.on("whisper", (username, message) => {
        if (username === "Neboer") {
            if (message === "a") bot.whisper("Neboer", curr_exec())
            if (message === "b") stop_exec()
        }
    })
    bot.on('goal_reached', (goal) => {
        console.log('Here I am !' + goal)
    })
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
