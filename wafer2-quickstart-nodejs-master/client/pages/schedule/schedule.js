// pages/schedule/schedule.js
var app = getApp();
const util = require('../../utils/util.js')
var config = require('../../config')
var convertTime = require("../../functionjs/convertTime.js")
var calcuDiff = require("../../functionjs/calcuDiff.js")
var merge_bed_study = require('../../functionjs/merge_bed_study.js')
//var time1, time2, time3
//var today, yesterday, before
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
    today:'',
    yesterday:'',
    before:'',
    arrayTest: {},
    bedTime: {},
    arrayTestY:{},
    bedTimeY:{},
    arrayTestB:{},
    bedTimeB:{},
    sum: true,
    time:'',
    timeY:'',
    timeB:'',
    time1:'',
    time2:'',
    time3:'',
    merge:'',
    mergeY:'',
    mergeB:''
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
        //console.log("合并");
        //console.log(merge_bed_study.merge_bed_study(temp).reverse())

        this.setData({
          arrayTest: temp.Study,
          bedTime: temp.BedTime,
          merge: merge_bed_study.merge_bed_study(temp).reverse()
        })
        
        var k
        for(k=0;k<this.data.merge.length;k++)
        {
          if (this.data.merge[k].type == 1 || this.data.merge[k].type ==2)
          {
            console.log("hebing")
            var a = "merge[" + k + "].timestamp"
            this.setData({
              [a]: util.formatStampTime(this.data.merge[k].timestamp, 'h:m:s')
            })
          }
          else
          {
            var a = "merge[" + k + "].OpenId"
            var b = "merge[" + k + "].StartTime"
            var c = "merge[" + k + "].EndTime"
            this.setData({
              [a]: calcuDiff.calcuDiff(this.data.merge[k].StartTime, this.data.merge[k].EndTime),
              [b]: util.formatStampTime(this.data.merge[k].StartTime, 'h:m:s'),
              [c]: util.formatStampTime(this.data.merge[k].EndTime, 'h:m:s')
            })
          }
        }
        for (k = 0; k < this.data.merge.length; k++)
        {
          console.log(this.data.merge[k].type)
          if (this.data.merge[k].type==undefined)
          console.log("bucunz")
        }
        console.log("合并");
        console.log(this.data.merge)
        console.log(this.data.merge.length)
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

  //得到 昨天 学习和睡眠时间
  GetYesterday: function () {
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
    var ee = timestamp - s - m * 60 - h * 60 * 60
    var ss = ee - 24 * 60 * 60
    console.log(ee)
    console.log(util.formatStampTime(ss,'Y/M/D'))
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
          arrayTestY: temp.Study,
          bedTimeY: temp.BedTime,
          mergeY: merge_bed_study.merge_bed_study(temp).reverse()
        })

        var k
        for (k = 0; k < this.data.mergeY.length; k++) {
          if (this.data.mergeY[k].type == 1 || this.data.mergeY[k].type == 2) {
            console.log("hebing")
            var a = "mergeY[" + k + "].timestamp"
            this.setData({
              [a]: util.formatStampTime(this.data.mergeY[k].timestamp, 'h:m:s')
            })
          }
          else {
            var a = "mergeY[" + k + "].OpenId"
            var b = "mergeY[" + k + "].StartTime"
            var c = "mergeY[" + k + "].EndTime"
            this.setData({
              [a]: calcuDiff.calcuDiff(this.data.mergeY[k].StartTime, this.data.mergeY[k].EndTime),
              [b]: util.formatStampTime(this.data.mergeY[k].StartTime, 'h:m:s'),
              [c]: util.formatStampTime(this.data.mergeY[k].EndTime, 'h:m:s')
            })
          }
        }
        for (k = 0; k < this.data.mergeY.length; k++) {
          console.log(this.data.mergeY[k].type)
          if (this.data.mergeY[k].type == undefined)
            console.log("bucunz")
        }
        console.log("合并");
        console.log(this.data.mergeY)
        console.log(this.data.arrayTestY)
        console.log(this.data.bedTimeY)
        console.log("昨天学习")
        console.log(temp)
        console.log(temp.Study.length)


        var i
        var j
        for (j = 0; j < temp.BedTime.length; j++) {
          var a = "bedTimeY[" + j + "].timestamp"
          this.setData({
            [a]: util.formatStampTime(this.data.bedTimeY[j].timestamp, 'h:m:s')
          })

        }
        console.log(this.data.bedTimeY)
        for (i = 0; i < temp.Study.length; i++) {
          var a = "arrayTestY[" + i + "].OpenId"
          var b = "arrayTestY[" + i + "].StartTime"
          var c = "arrayTestY[" + i + "].EndTime"
          this.setData({
            [a]: calcuDiff.calcuDiff(this.data.arrayTestY[i].StartTime, this.data.arrayTestY[i].EndTime),
            [b]: util.formatStampTime(this.data.arrayTestY[i].StartTime, 'h:m:s'),
            [c]: util.formatStampTime(this.data.arrayTestY[i].EndTime, 'h:m:s')
          })

        }
        console.log(this.data.arrayTestY)
      }
    })
    return ss
  },
  //得到 前天 学习和睡眠时间
  GetTwoDaysAgo: function () {
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
    var ee = timestamp - s - m * 60 - h * 60 * 60 - 24 * 60 * 60
    var ss = ee - 24 * 60 * 60
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
          arrayTestB: temp.Study,
          bedTimeB: temp.BedTime,
          mergeB: merge_bed_study.merge_bed_study(temp).reverse()
        })
        var k
        for (k = 0; k < this.data.mergeB.length; k++) {
          if (this.data.mergeB[k].type == 1 || this.data.mergeB[k].type == 2) {
            console.log("hebing")
            var a = "mergeB[" + k + "].timestamp"
            this.setData({
              [a]: util.formatStampTime(this.data.mergeB[k].timestamp, 'h:m:s')
            })
          }
          else {
            var a = "mergeB[" + k + "].OpenId"
            var b = "mergeB[" + k + "].StartTime"
            var c = "mergeB[" + k + "].EndTime"
            this.setData({
              [a]: calcuDiff.calcuDiff(this.data.mergeB[k].StartTime, this.data.mergeB[k].EndTime),
              [b]: util.formatStampTime(this.data.mergeB[k].StartTime, 'h:m:s'),
              [c]: util.formatStampTime(this.data.mergeB[k].EndTime, 'h:m:s')
            })
          }
        }
        for (k = 0; k < this.data.mergeB.length; k++) {
          console.log(this.data.mergeB[k].type)
          if (this.data.mergeB[k].type == undefined)
            console.log("bucunz")
        }
        console.log("合并");
        console.log(this.data.mergeB)
        
        console.log(this.data.arrayTestB)
        console.log(this.data.bedTimeB)
        console.log("前天学习")
        console.log(temp)
        console.log(temp.Study.length)


        var i
        var j
        for (j = 0; j < temp.BedTime.length; j++) {
          var a = "bedTimeB[" + j + "].timestamp"
          this.setData({
            [a]: util.formatStampTime(this.data.bedTimeB[j].timestamp, 'h:m:s')
          })

        }
        console.log(this.data.bedTimeB)
        for (i = 0; i < temp.Study.length; i++) {
          var a = "arrayTestB[" + i + "].OpenId"
          var b = "arrayTestB[" + i + "].StartTime"
          var c = "arrayTestB[" + i + "].EndTime"
          this.setData({
            [a]: calcuDiff.calcuDiff(this.data.arrayTestB[i].StartTime, this.data.arrayTestB[i].EndTime),
            [b]: util.formatStampTime(this.data.arrayTestB[i].StartTime, 'h:m:s'),
            [c]: util.formatStampTime(this.data.arrayTestB[i].EndTime, 'h:m:s')
          })

        }
        console.log(this.data.arrayTestB)
      }
    })
    return ss
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
    var y=this.GetYesterday();
    var b=this.GetTwoDaysAgo();
    this.CalculateTotalDay(),
      this.CalculateTotalTime(),
      this.CalculateAverage(),
    // this.GetHistory();
    // var today=app.globalData.summary
    console.log(that.data.arrayTest)
    console.log(that.data.bedTime)

    console.log(this.data.sum)
    console.log(today)
    this.setData({
      today: "你还没有学习记录",
      yesterday: "昨天还没有记录",
      before: "前天还没有记录",
    })
    //var time = util.ChangeTimeToText(new Date());
    console.log(new Date())
    var time = util.formatTime(new Date()).substring(0, 10);
    var timeY = util.formatStampTime(y,'Y/M/D')
    var timeB=util.formatStampTime(b,'Y/M/D')
    var date = new Date();
    console.log((-1+7)%7)
    console.log((date.getDay()-1+7)%7)
    console.log(this.data.days[date.getDay()].day)
      this.setData({
        time: time,
        timeY:timeY,
        timeB:timeB,
        time1: this.data.days[date.getDay()].day,
      })
      this.setData({
        time2: this.data.days[(date.getDay()-1+7)%7].day,
        time3: this.data.days[(date.getDay()-2+7)%7].day,
      })
      console.log(this.data.time1)
      console.log(this.data.time2)
      console.log(this.data.time3)
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