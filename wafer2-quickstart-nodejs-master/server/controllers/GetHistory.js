const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : -1
  
  let result = await mysql('Calender').where({ OpenId: userInfo.openId }).whereNotNull('EndTime').select()
  let result2 = await mysql('BedTime').where({ OpenId: userInfo.openId }).select()
  ctx.state.data = { 'Study': result, 'BedTime': result2 }
}