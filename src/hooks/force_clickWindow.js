function ClickWindow (bot, actionId, button, clicked_item, mode, slot, window_id){
    return new Promise((resolve, reject) => {
        bot._client.write('window_click', {
            windowId: window_id,
            slot,
            mouseButton: button,
            action: actionId,
            mode,
            item: clicked_item
        })

        bot.once(`confirmTransaction${actionId}`, (success) => {
            if (success) {
                resolve()
            } else {
                reject(new Error('Server rejected transaction.'))
            }
        })
    })

}

module.exports = ClickWindow