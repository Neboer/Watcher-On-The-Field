/*
    这是一个很费解的测试，但是理解它很重要。
    这里做了两件事情：将一个方法用检验器等包裹起来，和把一个callback形式的方法变为promise形式，同时增加超时的选项。
    一旦超时，外部函数将直接报错，但是这个时候内部函数还在正常执行。因此超时一定要求合理——一旦超时就意味着函数执行一定失败了。
 */
const cbcr = require('../hooks/callback_converter')
const keepDoing = require('../hooks/keep_trying')

let time = 4

let bot = {
    making(a1, a2, cb) {
        time--
        console.log(`making ${time}`)
        setTimeout(cb, time * 1000)
    }
}


function making_wrapper(making_func) {
    return (function () {
        let bad_func = making_func
        return function (a1, a2, cb) {
            if (a1 === 0) cb()
            else bad_func(a1, a2, cb)
        }
    })()
}

bot.making = making_wrapper(bot.making)

bot.good_making = cbcr(bot.making, 1500)

async function test_func() {
    await keepDoing(bot.good_making, ["a1", "a2"],3)
    console.log("finished")
}

test_func()