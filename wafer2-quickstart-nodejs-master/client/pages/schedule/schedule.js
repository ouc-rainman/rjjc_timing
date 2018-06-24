// pages/schedule/schedule.js
var app = getApp();
const util = require('../../utils/util.js')
var config = require('../../config')
var convertTime = require("../../functionjs/convertTime.js")
var calcuDiff = require("../../functionjs/calcuDiff.js")
var merge_bed_study = require('../../functionjs/merge_bed_study.js')
var time1, time2, time3
var today, yesterday, before
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyStatus: '',
    day: 3,
    hour: 5,
    ahour: 1,
    days: [{ day: "周日" }, { day: "周一" }, { day: "周二" }, { day: "周三" }, { day: "周四" }, { day: "周五" }, { day: "周六" }
    ],
    arrayTest: {},
    wakeUp: {},
    sleep: {},
    bedTime: {},
    sum: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },


  showT: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['起床', '睡觉',],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex) {
          that.Sleep()
        }
        else {
          that.WakeUp()
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //计算总的学习天数
  CalculateTotalDay: function () {
    var temp
    wx.request({
      url: config.service.CalculateTotalDayUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        temp = res.data.data
        console.log(temp)
        this.setData({
          day: temp
        })
      }
    })
  },

  //计算总学习时长
  CalculateTotalTime: function () {
    var temp
    wx.request({
      url: config.service.CalculateTotalTimeUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        temp = res.data.data
        console.log(temp)
        this.setData({
          hour: temp
        })
      }
    })
  },


  //计算每日平均学习时长
  CalculateAverage: function () {
    var temp
    wx.request({
      url: config.service.CalculateAverageUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        temp = res.data.data
        console.log(temp)
        this.setData({
          ahour: temp
        })
      }
    })
  },

  // 开始学习
  StartWatch: function () {
    wx.request({
      url: config.service.StartWatchUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        summary: "托福词汇",
        userInfo: app.globalData.userInfo
      },
      success: res => {
        console.log(res)
      }
    })
  },

  //检查是否正在学习
  CheckWatch: function () {
    var temp
    wx.request({
      url: config.service.CheckWatchUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        temp = res.data.data
        console.log("学习状态" + temp)
        this.setData({
          studyStatus: temp
        })
      }
    })

  },


  //用户起床  数据库type列为1
  WakeUp: function () {
    console.log("起床")
    wx.request({
      url: config.service.WakeUpUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        let temp = res.data.data
        console.log(temp)
        this.GetToday()
      }
    })
  },

  //用户睡觉  数据库type列为2
  Sleep: function () {
    console.log("睡觉")
    wx.request({
      url: config.service.SleepUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        let temp = res.data.data
        console.log(temp)
        this.GetToday()
      }
    })
  },
  //得到今天的学习日程和睡眠时间
  GetToday: function () {
    var temp
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = date.getMonth();
    //日  
    var D = date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    //今天的开始时间
    var ss = timestamp - s - m * 60 - h * 60 * 60
    var ee = ss + 24 * 60 * 60
    // console.log(timestamp,ss,ee)
    wx.request({
      url: config.service.GetTodayUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo,
        TodayStart: ss,
        TodayEnd: ee
      },
      success: res => {
        temp = res.data.data

        this.setData({
          arrayTest: temp.Study,
          bedTime: temp.BedTime
        })
        console.log(this.data.arrayTest)
        console.log(this.data.bedTime)
        console.log("今日学习")
        console.log(temp)
        console.log(temp.Study.length)


        var i
        var j
        for (j = 0; j < temp.BedTime.length; j++) {
          var a = "bedTime[" + j + "].timestamp"
          this.setData({
            [a]: util.formatStampTime(this.data.bedTime[j].timestamp, 'h:m:s')
          })

        }
        console.log(this.data.bedTime)
        for (i = 0; i < temp.Study.length; i++) {
          var a = "arrayTest[" + i + "].OpenId"
          var b = "arrayTest[" + i + "].StartTime"
          var c = "arrayTest[" + i + "].EndTime"
          this.setData({
            [a]: calcuDiff.calcuDiff(this.data.arrayTest[i].StartTime, this.data.arrayTest[i].EndTime),
            [b]: util.formatStampTime(this.data.arrayTest[i].StartTime, 'h:m:s'),
            [c]: util.formatStampTime(this.data.arrayTest[i].EndTime, 'h:m:s')
          })

        }
        console.log(this.data.arrayTest)
      }
    })
    return temp
  },


  //得到这个人的所有时间的学习和睡眠时间
  GetHistory: function () {

    wx.request({
      url: config.service.GetHistoryUrl,
      method: 'post',
      //这里定义传递的参数
      data: {
        userInfo: app.globalData.userInfo
      },
      success: res => {
        let temp = res.data.data
        console.log("历史学习")
        console.log(temp)
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
  onShow: function () {
    //var sum=true
    var today = '你还没有学习记录'
    var that = this
    this.CheckWatch();
    this.GetToday();
    // this.GetHistory();
    // var today=app.globalData.summary
    console.log(that.data.arrayTest)
    console.log(that.data.bedTime)
    if (!this.data.arrayTes) {
      console.log("mmm")
      console.log(that.data.arrayTest)
      if (!this.data.bedTime) {
        console.log("hhhh")
        console.log(that.data.bedTime)
        this.setData({
          sum: false
        })
        today = "今天还没有学习记录"
      }

    }
    console.log(this.data.sum)
    console.log(today)
    this.setData({
      today: today,
      yesterday: "昨天还没有记录",
      before: "前天还没有记录",
    })
    //var time = util.ChangeTimeToText(new Date());
    console.log(new Date())
    var time = util.formatTime(new Date()).substring(0, 10);
    var date = new Date();
    console.log(date.getDay())
    console.log(this.data.days[date.getDay()].day)
    this.CalculateTotalDay(),
      this.CalculateTotalTime(),
      this.CalculateAverage(),
      this.setData({
        time: time,
        time1: this.data.days[date.getDay()].day,
        //time2: this.data.days[(date.getDay()-1)%7].day,
        //time3: this.data.days[(date.getDay()-2)%7].day,
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

  },
  goToPlan: function () {
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
  goToStatus: function () {
    wx.navigateTo({
      url: '../startStudy/startStudy',
    })
  },
  goToStudyRecord: function () {
    wx.navigateTo({
      url: '../studyRecord/studyRecord',
    })
  }
})