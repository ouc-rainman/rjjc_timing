// pages/community/community.js

var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMGURLS : [],
    Moment: 0
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

  // 上传图片接口
    doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl,
              //IMGURLS: that.data.IMGURLS.push(0)
            })
            that.addPicUrl(res.data.imgUrl)
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
    
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },

  // 增加一个图片地址
  addPicUrl: function (newurl) {
    let tt = this.data.IMGURLS
    tt.push(newurl)
    this.setData({
      IMGURLS: tt
    })
  },

  // 获取记录的文本框的信息
  getMoment: function (e) {
    this.setData({
      Moment: e.detail.value
    })
    // console.log(this.data.Moment)
  },

  //提交到数据库
  commitMoment: function(){
    wx.request({
      url: config.service.commitMomentUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo,
        Moment: this.data.Moment,
        IMGURLS: this.data.IMGURLS
      },
      success: res => {
        let temp = res.data.data
        // console.log(temp,'54654')

      }
    })
    setTimeout(function () {
      wx.switchTab({
        url: '../showcommunity/showcommunity',
      })
    },2000)
    util.showSuccess('发表成功')
  }

})
