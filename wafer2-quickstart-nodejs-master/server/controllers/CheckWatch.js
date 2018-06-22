const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  //先看一下这个人有没有学习记录
  let result = await mysql.column('ID').where({ OpenId: userInfo.openId }).select().from('Calender')
  //如果这个人没有学习记录
  if (result.length == 0) {
    //返回没有正在学习
    ctx.state.data = false
  }
  //如果这个人学习过
  else{
    let MAXID_orgi = await mysql.max('ID').where({ OpenId: userInfo.openId }).from('Calender')
    let MAXID = MAXID_orgi[0]["max(`ID`)"]
    let EndTime = await mysql.column('EndTime').where({ OpenId: userInfo.openId, ID: MAXID }).select().from('Calender')
    // ctx.state.data = true
    // ctx.state.data = (EndTime[0]["EndTime"] == null)
    
    //返回正在学习
    if(EndTime[0]["EndTime"]==null){
      ctx.state.data = true
    }
    //返回未在学习
    else{
      ctx.state.data = false
    }
    
  }
  
}