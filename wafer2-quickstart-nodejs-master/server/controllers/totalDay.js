const { mysql } = require('../qcloud')
var totalDay = async function (userInfo) {

  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;

  let RegistionTime = await mysql('UserInfo').select('EnrollTime').where({ OpenId: userInfo.openId })
  RegistionTime = RegistionTime[0]["EnrollTime"]
  TotalSecond = timestamp - RegistionTime
  return TotalSecond

}

module.exports.totalDay = totalDay