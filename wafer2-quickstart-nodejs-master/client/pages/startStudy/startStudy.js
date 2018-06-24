// schedule/startStudy/startStudy.js
var app = getApp();
const util = require('../../utils/util.js')
var config = require('../../config')
var convertTime = require("../../functionjs/convertTime.js")
var calcuDiff = require("../../functionjs/calcuDiff.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary: '',
    startTime: '',
    sumTime: '',
  },

  // 停止学习
  StopWatch: function () {
    wx.request({
      url: config.service.StopWatchUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {

        console.log(res)
      }
    })
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
    this.setData({
      summary: app.globalData.summary
    })
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
    wx.navigateBack({
      delta: 2
    })
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

  }
})