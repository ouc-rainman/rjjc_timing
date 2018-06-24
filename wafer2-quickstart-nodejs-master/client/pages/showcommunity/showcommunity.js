// pages/showcommunity/showcommunity.js

var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var char_convertTime = require("../../functionjs/char_convertTime.js")
var compareArray = require("../../functionjs/compareArray.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MomentText: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log('onLoad......')
    var that = this
    wx.request({
      url: config.service.showMomentUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        
      },
      success: res => {
        let temp = res.data.data
        // console.log(temp)
        res.data.data.users.sort(compareArray.compareArray("momentTime"))
        for(var i = 0; i < res.data.data.users.length; i++){
          res.data.data.users[i]['momentTime'] = char_convertTime.char_convertTime(res.data.data.users[i]['momentTime'])
          res.data.data.users[i]['urls'] = []
        }
        // console.log('5656',res.data.data)
        for(var i = 0; i < res.data.data.users.length; i++){
          for(var j = 0; j < res.data.data.IMGSETS.length; j++){
            if(res.data.data.users[i].momentID == res.data.data.IMGSETS[j].momentID){
              res.data.data.users[i]['urls'].push(res.data.data.IMGSETS[j].imgUrl)
            }
          }
        }



        console.log(res.data.data.users)
        this.setData({
          MomentText: res.data.data.users

        })
      }
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
  
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
  
  }
})