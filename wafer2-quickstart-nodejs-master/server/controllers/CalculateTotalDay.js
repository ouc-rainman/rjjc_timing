const { mysql } = require('../qcloud')
var totalDay = require("./totalDay.js")
module.exports = async ctx => {

  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998

  TotalSecond = await totalDay.totalDay(userInfo)
  TotalMinute = TotalSecond / 60.0
  TotalHours = TotalMinute / 60.0
  TotalDays = TotalHours / 24.0
  ctx.state.data = TotalDays.toFixed(2)
}