const mineflayer = require('mineflayer')
const farmer = require('./crop_cutter')
const start = require('./main_loop')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const inventoryViewer = require('mineflayer-web-inventory')


const bot = mineflayer.createBot({
    host: 'localhost',
    port: 49825,
    username: 'Labor',
    version: '1.16.3'
})

inventoryViewer(bot)

bot.dig = (function () {
    let unsafe_dig = bot.dig
    return function (block, cb) {
        if (block.name === 'wheat' && block.stateId !== 3364) {
            cb()
        } else {
            try {
                unsafe_dig(block, cb)
            } catch (e) {
                console.error(e)
                debugger
            }
        }
    }
})()

// 注意：改变了此函数的执行，这样当操作超时的时候默认操作时失败的。
bot.placeBlock = (function () {
    let bad_placeBlock = bot.placeBlock
    return function (referenceBlock, faceVector, cb) {
        let executing_is_finished = false
        let timeout_error = new Error("timeout")
        bad_placeBlock(referenceBlock,faceVector, () => {
            executing_is_finished = true
            cb()
        })
        setTimeout(() => {
            if (!executing_is_finished) cb(timeout_error)
        }, 1000)
    }
})()

bot.loadPlugin(pathfinder)

bot.on("login", () => {
    start(bot)
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))