const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let users = await mysql('Moment').select('UserInfo.openId','UserInfo.NickName','UserInfo.AvatarUrl','Moment.momentText','Moment.momentID','Moment.momentTime').leftJoin('UserInfo','Moment.openId','UserInfo.openId')
  // let users = await mysql('UserInfo').select('openId')
  // let user = ['1','55']
  let IMGSETS = await mysql('MomentPic').select('*')
  ctx.state.data = {users, IMGSETS}
}
