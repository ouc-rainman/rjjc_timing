const { mysql } = require('../qcloud')
var totalTime = require("./totalTime.js")
module.exports = async ctx => {

  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998

  TotalSecond = await totalTime.totalTime(userInfo)
  TotalMinute = TotalSecond/60.0
  TotalHours = TotalMinute/60.0
  ctx.state.data = TotalHours.toFixed(2)
}