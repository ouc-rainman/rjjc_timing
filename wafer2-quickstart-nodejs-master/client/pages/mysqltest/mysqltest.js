// pages/mysqltest/mysqltest.js
var app = getApp(); 
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:'jkljl'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //接受MySql数据
  GetMysqlMessage: function(){
    wx.request({
      
      url: config.service.test_getUrl,
      method: 'get',
      //这里定义传递的参数
      data: {
        second: 45
      },
      success: res => {
        //console.log(res)
        let first = res.data.data
        this.setData({
          test: first[0].first
        })
        //console.log(first[0])
        //console.log(app.globalData.userInfo)
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        //console.log("当前时间戳为：" + timestamp);
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

        //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

      }
    }
    )
  }
})