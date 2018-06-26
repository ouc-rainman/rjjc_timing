var totalDay = require("./totalDay.js")
var totalTime = require("./totalTime.js")
module.exports = async ctx => {

  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998

  TotalSecond = await totalDay.totalDay(userInfo)
  TotalMinute = TotalSecond / 60.0
  TotalHours = TotalMinute / 60.0
  TotalDays = TotalHours / 24.0

  TotalSecond2 = await totalTime.totalTime(userInfo)
  TotalMinute2 = TotalSecond2/60.0
  TotalHours2 = TotalMinute2/60.0

  ctx.state.data = (TotalHours2/TotalDays).toFixed(2)
  // ctx.state.data = 2
}