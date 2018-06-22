const { mysql } = require('../qcloud')
var Check = require("./Check.js")
module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  let statue = await Check.Check(userInfo.openId)
  if (statue == false) {
    //未在学习中不能使用"结束学习"返回错误代码-1
    ctx.state.data = -1
  }
  else {
    let MAXID_orgi = await mysql.max('ID').where({ OpenId: userInfo.openId }).from('Calender')
    let MAXID = MAXID_orgi[0]["max(`ID`)"]
    await mysql.update({EndTime:timestamp}).where({ID:MAXID}).from('Calender')
    ctx.state.data = 0
  }

}