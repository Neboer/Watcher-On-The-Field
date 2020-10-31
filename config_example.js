module.exports = {
    bot_config: {
        host: '127.0.0.1',
        port: 25565,
        username: 'wheat_android',
        version: '1.16.3',
        viewDistance: "far"
    },
    range: [[-42, 128], [-50, 120]],// 矩形麦田的两点x/z坐标
    height: 3, // 耕地方块的高度y坐标。
    report_secret: 'tellmeandiwillreportstatus',
    toss_secret: 'giveallthingstome',
    report_to: 'master',
    async login_immediate(bot) {// 当登录之后立即执行以下命令
        setTimeout(() => {
            bot.chat('/login password')
            return
        }, 1000)
    }
}