
const { mysql } = require('../qcloud')
var totalTime = async function (userInfo) {

  let EndTimeSum = await mysql.sum('EndTime').where({ OpenId: userInfo.openId }).whereNotNull('EndTime').from('Calender')
  let StartTimeSum = await mysql.sum('StartTime').where({ OpenId: userInfo.openId }).whereNotNull('EndTime').from('Calender')
  TotalSecond = EndTimeSum[0]["sum(`EndTime`)"] - StartTimeSum[0]["sum(`StartTime`)"]
  TotalMinute = TotalSecond / 60.0
  TotalHours = TotalMinute / 60.0
  return TotalSecond

}

module.exports.totalTime = totalTime