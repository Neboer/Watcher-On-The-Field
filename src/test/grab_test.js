const mineflayer = require('mineflayer')
const cbConverter = require('../hooks/callback_converter')
const grab = require('../actions/grab')
const inventoryViewer = require('mineflayer-web-inventory')
const Vec3 = require('vec3')

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: 'Kiruya',
    version: '1.16.3',
    viewDistance: "far"
})

inventoryViewer(bot)

bot.ClickWindow = cbConverter(bot.clickWindow, 1000)

bot.Grab = async (item_id) => await grab(bot, item_id);

bot.on('whisper', async (username, message) => {// 712骨粉
    // console.log(bot.nextActionNumber)
    let id = parseInt(message)
    let farmland = bot.findBlock({matching: 153})
    await bot.Grab(id)
    console.log('good')
    bot.placeBlock(farmland, new Vec3(0,1,0), (e) => {
        console.error(e)
    })
})