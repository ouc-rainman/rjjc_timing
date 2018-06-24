const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : -1
  let openId = userInfo.openId
  //先看一下这个人有没有学习记录
  let result = await mysql.column('ID').where({ OpenId: openId }).select().from('Calender')
  // ctx.state.data = result
  //如果这个人没有学习记录
  if (result.length == 0) {
    //返回没有正在学习
    ctx.state.data = false
  }
  //如果这个人学习过
  else{
    let MAXID_orgi = await mysql.max('ID').where({ OpenId: openId }).from('Calender')
    let MAXID = MAXID_orgi[0]["max(`ID`)"]
    let EndTime = await mysql.column('EndTime').where({ OpenId: openId, ID: MAXID }).select().from('Calender')
    //返回正在学习
    if (EndTime[0]["EndTime"] == null) {
      let StartTime = await mysql.column('StartTime').where({ OpenId: openId, ID: MAXID }).select().from('Calender')
      let Summary = await mysql.column('Summary').where({ OpenId: openId, ID: MAXID }).select().from('Calender')
      ctx.state.data = {'StartTime':StartTime[0]["StartTime"], 'Summary':Summary[0]["Summary"]}
    }
    //返回未在学习
    else {
      ctx.state.data = false
    }

  }

}