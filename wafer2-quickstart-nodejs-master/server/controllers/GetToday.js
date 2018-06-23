const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : -1
  let TodayStart = ctx.request.body.TodayStart? ctx.request.body.TodayStart : -1
  let TodayEnd = ctx.request.body.TodayEnd ? ctx.request.body.TodayEnd : -1
  let result = await mysql('Calender').where({ OpenId: userInfo.openId }).andWhere('StartTime', '>', TodayStart).andWhere('StartTime', '<', TodayEnd).select()
  let result2 = await mysql('BedTime').where({ OpenId: userInfo.openId }).andWhere('timestamp', '>', TodayStart).andWhere('timestamp', '<', TodayEnd).select()
  ctx.state.data = {'Study':result, 'BedTime': result2}
}