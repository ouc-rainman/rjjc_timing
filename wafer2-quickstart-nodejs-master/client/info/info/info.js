// info/info/info.js
var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '我的结伴信息', url: '../userinfo/userinfo', icon: '../../images/usermenu/1.png', tips: '' },
      { text: '查看我的学习档案', url: '../record/record', icon: '../../images/usermenu/2.png', tips: '' },
      { text: '我的学习历史', url: '../history/history', icon: '../../images/usermenu/3.png', tips: '' },
      { text: '绑定手机', url: '../phone/phone', icon: '../../images/usermenu/4.png', tips: '' },
      { text: '添加通信录好友', url: '../friend/friend', icon: '../../images/usermenu/5.png', tips: '' },
      { text: '邀请好友来学习', url: '../invite/invite', icon: '../../images/usermenu/6.png', tips: '' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    _app.getUserInfo(function (userinfo) {
      console.log(userinfo)
      that.setData({
        userinfo: userinfo,
      })
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
  onShow: function () {
    let that = this
    _app.getUserInfo(function (userinfo) {
      console.log(userinfo)
      that.setData({
        userinfo: userinfo,
      })
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