// scroll/switch/switch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "../../images/reminder.png",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [ //假数据
      [{ name: "A",src:" " },
      { name: "B" ,src:" "}],
      [{ name: "C",src:" " },
      { name: "D" ,src:" "}],
      [{ name: "E",src:" " },
      { name: "F",src:" "}],
      [{ name: "G",src:" " },
      { name: "H" ,src:" "}],
      [{ name: "I",src:" " },
      { name: "G" ,src:" "}]
    ]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log("hhhhhhhha")
    console.log(e)
    var cur = e.target.dataset.current;//1
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000
    )
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

  }
})