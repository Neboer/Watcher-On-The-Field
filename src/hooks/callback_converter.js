// 将一个callback形式的函数变为promise形式。注意到回调函数必须是最后一个。同时，调用成功不会传入有意义的变量。
let TimeOutError = new Error("timeout")
// let ParametersCountNotMatchError = new Error("too much parameters")

function convert_a_callback_into_a_promise_function(func, callback_timeout) {
    let ret_func
    if (callback_timeout <= 0) { // 无timeout
        ret_func = function (...args) {// 有意义的变量列表，不包含回调函数。
            return new Promise((onResolve, onReject) => {
                func(...args, (err) => {
                    if (err) onReject(err)
                    else onResolve()
                })
            })
        }
    } else {
        ret_func = function (...args) {// 有意义的变量列表，不包含回调函数。
            let execute_finished = false
            return new Promise((onResolve, onReject) => {
                func(...args, (err) => {
                    execute_finished = true
                    if (err) onReject(err)
                    else onResolve()
                })
                setTimeout(() => {
                    if (!execute_finished) onReject(TimeOutError)
                }, callback_timeout)
            })
        }
    }
    ret_func.extra_data = func.name
    return ret_func
}

module.exports = convert_a_callback_into_a_promise_function