const mineflayer = require('mineflayer')
const cbConverter = require('../hooks/callback_converter')
const inventoryViewer = require('mineflayer-web-inventory')

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 1259,
    username: 'Kiruya',
    version: '1.16.3',
    viewDistance: "far"
})

// inventoryViewer(bot)


bot.on('spawn',async () => {
    await wait(1000)
    let composter = bot.findBlock({matching: 728})
    let left = 64
    console.log('start')
    while (true){
        bot._client.write('block_place', {
            location: composter.position,
            direction: 1,
            hand: 0,
            cursorX: 0.5,
            cursorY: 0.5,
            cursorZ: 0.5,
            insideBlock: false
        })
        await wait(200)
    }
    // let doIter = () => {
    //     left--
    //     if (left < 0) {
    //         console.log('over')
    //         return
    //     }
    //
    //     setTimeout(() => {
    //         bot.activateBlock(composter, doIter)
    //     }, 200)
    // }
    // doIter()
})

