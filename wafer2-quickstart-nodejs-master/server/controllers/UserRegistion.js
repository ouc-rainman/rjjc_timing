const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  let result = await mysql.column('OpenId').where({ OpenId: userInfo.openId }).select().from('UserInfo')
  if(result.length==0){
    let result = await mysql('UserInfo').insert({OpenId:userInfo.openId, EnrollTime:timestamp, AvatarUrl:userInfo.avatarUrl, NickName:userInfo.nickName})
  }
  ctx.state.data = true
}