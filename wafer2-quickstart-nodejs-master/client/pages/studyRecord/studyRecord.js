// page/studyRecord/studyRecord.js
var app = getApp();
const util = require('../../utils/util.js')
var config = require('../../config')
var convertTime = require("../../functionjs/convertTime.js")
var calcuDiff = require("../../functionjs/calcuDiff.js")
var merge_bed_study = require('../../functionjs/merge_bed_study.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayTest: {},
    today: ''
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
    var today = "没有学习记录"
    
    this.setData({
      today: today
    })
    this.GetHistory();
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
  //得到这个人的所有时间的学习和睡眠时间
  GetHistory: function () {
    var temp;
    wx.request({
      url: config.service.GetHistoryUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        temp = res.data.data
        console.log("历史学习")
        console.log(temp)
        this.setData({
          arrayTest: temp.Study.reverse()
        })
        console.log(this.data.arrayTest)

        var i
        var l = temp.Study.length - 1
        for (i = temp.Study.length - 1; i >= 0; i--) {
          var a = "arrayTest[" + i + "].OpenId"
          var b = "arrayTest[" + i + "].StartTime"
          var c = "arrayTest[" + i + "].EndTime"
          this.setData({
            [a]: calcuDiff.calcuDiff(this.data.arrayTest[i].StartTime, this.data.arrayTest[i].EndTime),
            [b]: util.formatStampTime(this.data.arrayTest[i].StartTime, 'Y/M/D h:m:s'),
            [c]: util.formatStampTime(this.data.arrayTest[i].EndTime, 'Y/M/D h:m:s')
          })

        }
      }
    })
  }
})