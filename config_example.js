module.exports = {
    bot_config: {
        host: '127.0.0.1',
        port: 25565,
        username: 'wheat_android',
        version: '1.16.3',
        viewDistance: "far"
    },
    range: [[-129, 47], [-139, 56]],
    async login_immediate(bot) {// 当登录之后立即执行以下命令
        setTimeout(() => {
            bot.chat('/login password')
            return
        }, 1000)
    }
}