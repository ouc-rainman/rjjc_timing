const { mysql } = require('../qcloud')
var Check = async function(openId) {

  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //先看一下这个人有没有学习记录
  let result = await mysql.column('ID').where({ OpenId: openId }).select().from('Calender')
  //如果这个人没有学习记录
  if (result.length == 0) {
    //返回没有正在学习
    return false
  }
  //如果这个人学习过
  else {
    let MAXID_orgi = await mysql.max('ID').where({ OpenId: openId }).from('Calender')
    let MAXID = MAXID_orgi[0]["max(`ID`)"]
    let EndTime = await mysql.column('EndTime').where({ OpenId: openId, ID: MAXID }).select().from('Calender')
    // ctx.state.data = true
    // ctx.state.data = (EndTime[0]["EndTime"] == null)

    //返回正在学习
    if (EndTime[0]["EndTime"] == null) {
      return true
    }
    //返回未在学习
    else {
      return false
    }
  }

}

module.exports.Check = Check