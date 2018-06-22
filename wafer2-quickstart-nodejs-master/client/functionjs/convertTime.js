var convertTime = function (timestamp){
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  var sec_data = {'Y': Y, 'M': M, 'D': D, 'h': h, 'm':m, 's':s}
  return sec_data
   //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s); 
}

module.exports.convertTime = convertTime