
/**
 * request请求封装
 * url   传递方法名
 * types 传递方式(1,GET,2,POST)
 * data  传递数据对象
 */
/*
function commonAjax(url, types, data) {

  // 获取公共配置
  var app = getApp()

  // 公共参数（一般写接口的时候都会有些公共参数，你可以事先把这些参数都封装起来，就不用每次调用方法的时候再去写，）
  var d = {
    token: '123456789',// 例如：这是我们自己的验证规则
  }

  // 合并对象(公共参数加传入参数合并对象) mergeObj对象在下面
  var datas = mergeObj(d, data)

  // 这是es6的promise版本库大概在1.1.0开始支持的，大家可以去历史细节点去看一下，一些es6的机制已经可以使用了
  var promise = new Promise(function (resolve, reject, defaults) {
    // 封装reuqest
    wx.request({
      url: app.globalData.url + url,
      data: datas,
      method: (types === 1) ? 'GET' : 'POST',
      header: (types === 1) ? { 'content-type': 'application/json' } : { 'content-type': 'application/x-www-form-urlencoded' },
      success: resolve,
      fail: reject,
      complete: defaults,
    })
  });
  return promise;
}
*/
/**
 * object 对象合并
 * o1     对象一
 * o2     对象二
 */
/*
function mergeObj(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key]
  }
  return o1;
}
*/

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatStampTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}  
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

module.exports = {
  formatStampTime:formatStampTime,
  formatTime: formatTime,
 // commonAjax: commonAjax,  
  showBusy:showBusy,
  showSuccess:showSuccess,
  showModel:showModel
}
