var char_convertTime = function (timestamp) {
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  //分  
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  //秒  
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  var sec_data = { 'Y': Y, 'M': M, 'D': D, 'h': h, 'm': m, 's': s }
  return (Y + '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s)
  //console.log(Y+ '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s);
}

module.exports.char_convertTime = char_convertTime