// 在挂机的时候，需要限制机器人的侦测合法范围，超出范围的一切事件都不能对他造成影响。
let rangeRect = [
    [-129, 47],
    [-139, 56],
]// 两个点的x, z

function be_in_range(vec) {
    let x = vec.x
    let z = vec.z
    return ((x - rangeRect[0][0]) * (x - rangeRect[1][0]) <= 0 && (z - rangeRect[0][1]) * (z - rangeRect[1][1]) <= 0)
}

module.exports = be_in_range