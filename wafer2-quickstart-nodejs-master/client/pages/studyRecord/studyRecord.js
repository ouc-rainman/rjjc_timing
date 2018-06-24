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
    array:{},
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
          arrayTest: temp.Study.reverse(),
          array: merge_bed_study.merge_bed_study(temp),
        })
        console.log(this.data.arrayTest)
        console.log(this.data.array)
        var k
        for (k = 0; k < this.data.array.length; k++) {
          if (this.data.array[k].type == 1 || this.data.array[k].type == 2) {
            console.log("hebing")
            var a = "array[" + k + "].timestamp"
            this.setData({
              [a]: util.formatStampTime(this.data.array[k].timestamp, 'Y/M/D h:m:s')
            })
          }
          else {
            var a = "array[" + k + "].OpenId"
            var b = "array[" + k + "].StartTime"
            var c = "array[" + k + "].EndTime"
            this.setData({
              [a]: calcuDiff.calcuDiff(this.data.array[k].StartTime, this.data.array[k].EndTime),
              [b]: util.formatStampTime(this.data.array[k].StartTime, 'Y/M/D h:m:s'),
              [c]: util.formatStampTime(this.data.array[k].EndTime, 'Y/M/D h:m:s')
            })
          }
        }
        for (k = 0; k < this.data.array.length; k++) {
          console.log(this.data.array[k].type)
          if (this.data.array[k].type == undefined)
            console.log("bucunz")
        }
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