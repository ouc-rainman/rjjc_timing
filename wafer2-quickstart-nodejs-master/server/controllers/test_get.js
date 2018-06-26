const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let second = ctx.query.second? ctx.query.second : -1
  let first = await mysql.column('first').where({second:second}).select().from('test')
  /*let first = {
    first : 1,
    second :2
  }*/
  ctx.state.data = first
}