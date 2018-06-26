const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // let timestamp = Date.parse(new Date());
  // timestamp = timestamp / 1000;
  // let userInfo = ctx.request.body.userInfo ? ctx.request.body.userInfo : 9998
  // let Moment = ctx.request.body.Moment ? ctx.request.body.Moment : -1
  // let IMGURLS = ctx.request.body.IMGURLS ? ctx.request.body.IMGURLS : -1
  // await mysql('Moment').insert({ openId: userInfo.openId, momentTime: timestamp, momentText: Moment })
  // // let result = await mysql('Moment').insert({ openId: userInfo.openId})
  // let momentID = await mysql('Moment').select('momentID').where({ openId: userInfo.openId }).andWhere({ 'momentTime': timestamp })
  // momentID = momentID[0]['momentID']
  // for (var i = 0; i < IMGURLS.length; i++) {
  //   await mysql('MomentPic').insert({ 'momentID': momentID, imgUrl: IMGURLS[i] })
  // }
  // ctx.state.data = { Moment, IMGURLS }
  let userInfo = ctx.request.body.userInfo
  let friendID = ctx.request.body.friendID
  ctx.state.data = [userInfo,friendID]
}