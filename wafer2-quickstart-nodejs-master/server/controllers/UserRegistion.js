const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  let result = await mysql.column('OpenId').where({ OpenId: userInfo.openId }).select().from('UserInfo')
  var text=""
  while (true && result.length==0) {
    text=""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let result2 = await mysql('UserInfo').select('UserID').where({ UserID: text })
    if (result2.length == 0) break
  }
  if(result.length==0){
    let result = await mysql('UserInfo').insert({OpenId:userInfo.openId, EnrollTime:timestamp, AvatarUrl:userInfo.avatarUrl, NickName:userInfo.nickName, UserID:text})
  }

  ctx.state.data = true
}