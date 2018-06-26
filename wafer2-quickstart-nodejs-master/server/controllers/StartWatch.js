const { mysql } = require('../qcloud')
var Check = require("./Check.js")
module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  let summary = ctx.request.body.summary ? ctx.request.body.summary : "No summary"
  let statue = await Check.Check(userInfo.openId)
  if(statue == true){
    //正在学习中不能使用"开始学习"返回错误代码-1
    ctx.state.data = -1
  }
  else{
    let result = await mysql('Calender').insert({ OpenId: userInfo.openId, StartTime: timestamp, Summary: summary })
    ctx.state.data = 0
  }

}