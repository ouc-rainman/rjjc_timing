var calcuDiff = function (time1, time2) {
  console.log(time1,time2)
  var diff = time2 - time1
  // console.log(diff,'diff')
  var sec = diff % 60
  // console.log(sec,'sec')
  var hour = parseInt(diff / 3600)
  var min = (diff - hour * 3600 - sec) / 60
  var sec_data = { 'h': hour, 'm': min, 's': sec }
  return (hour + '小时' + min + '分钟' + sec + '秒')
  //console.log(hour,'小时',min,'分钟',sec,'秒'); 
}

module.exports.calcuDiff = calcuDiff