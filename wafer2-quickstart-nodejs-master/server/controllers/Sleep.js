const { mysql } = require('../qcloud')
var Check = require("./Check.js")
module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  let result = await mysql('BedTime').insert({ OpenId: userInfo.openId, timestamp: timestamp, Type: 2 })
  ctx.state.data = 0
}