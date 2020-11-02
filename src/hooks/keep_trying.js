const {wait} = require('./tools')


// 立刻开始执行命令，直到失败到指定次数或成功为止。
async function keepDoing(func, params_list, max_try_time) {
    let is_suc = false
    let try_time = 0
    while (true) {
        try {
            await func(...params_list)
            is_suc = true
        } catch (e) {
            try_time++
            await wait(1000)
            if (try_time > max_try_time) {
                throw new Error(`function ${func.extra_data} is keep failing!`)
            }
            continue
        }
        if (is_suc) return
    }
}

module.exports = keepDoing