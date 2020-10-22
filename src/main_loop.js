// 事件循环的工作过程：通过依次对列表中的函数进行调用，来判断哪个事件可以触发（优先）。
const {think_of_harvest, test_good_crop_exist} = require('./crop_cutter')
const {get_seed_and_wheat_entity} = require('./picker')

function start(bot) {
    let executing = false
    let current_executing = () => {}
    bot.on("move", () => {
        current_executing()
    })
    // 主循环
    setInterval(() => {
        if (!executing) {
            let test_good_crop = test_good_crop_exist(bot)
            if (test_good_crop) {
                current_executing = think_of_harvest(bot, test_good_crop, () => executing = false)
                return;
            }
        // else {
        //         let crop_entity = get_seed_and_wheat_entity(bot)
        //     }
        }
    }, 1000)
}

module.exports = start