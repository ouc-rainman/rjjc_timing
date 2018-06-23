//index.js
var app = getApp(); 
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    // 用户登录示例
    bindGetUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()
        //console.log(session)
        
        if (session) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            qcloud.loginWithCode({
                success: res => {
                    
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    app.globalData.userInfo = res
                    console.log(app.globalData.userInfo)
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    util.showSuccess('登录成功')
                    app.globalData.userInfo = res
                    console.log(app.globalData.userInfo)
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
    },

    // 切换是否带有登录态
    switchRequestMode: function (e) {
        this.setData({
            takeSession: e.detail.value
        })
        this.doRequest()
    },

    doRequest: function () {
        util.showBusy('请求中...')
        var that = this
        var options = {
            url: config.service.requestUrl,
            login: true,
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success', result)
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        }
        if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
            qcloud.request(options)
        } else {    // 使用 wx.request 则不带登录态
            wx.request(options)
        }
    },

    // 上传图片接口
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]

                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })

            },
            fail: function(e) {
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

    // 切换信道的按钮
    switchChange: function (e) {
        var checked = e.detail.value

        if (checked) {
            this.openTunnel()
        } else {
            this.closeTunnel()
        }
    },

    openTunnel: function () {
        util.showBusy('信道连接中...')
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            util.showSuccess('信道已连接')
            console.log('WebSocket 信道已连接')
            this.setData({ tunnelStatus: 'connected' })
        })

        tunnel.on('close', () => {
            util.showSuccess('信道已断开')
            console.log('WebSocket 信道已断开')
            this.setData({ tunnelStatus: 'closed' })
        })

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')
            util.showBusy('正在重连')
        })

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
            util.showSuccess('重连成功')
        })

        tunnel.on('error', error => {
            util.showModel('信道发生错误', error)
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('speak', speak => {
            util.showModel('信道消息', speak)
            console.log('收到说话消息：', speak)
        })

        // 打开信道
        tunnel.open()

        this.setData({ tunnelStatus: 'connecting' })
    },

    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     */
    sendMessage() {
        if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': 'I say something at ' + new Date(),
            });
        }
    },

    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
        if (this.tunnel) {
            this.tunnel.close();
        }
        util.showBusy('信道连接中...')
        this.setData({ tunnelStatus: 'closed' })
    },

    //跳转页面到mysqltest
    ToMysqlTest: function(){
      //console.log(this.data.userInfo)
      
      wx.navigateTo({
        url: '../mysqltest/mysqltest',
      })
      
     
    },

    //用户第一次登陆，保存信息到数据库
    RegistionTest: function(){
      console.log(app.globalData.userInfo.openId)
      wx.request({
        url: config.service.UserRegistionUrl,
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

    // 停止学习
    StopWatch: function(){
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
    CheckWatch: function(){
      wx.request({
        url: config.service.CheckWatchUrl,
        method: 'post',
        //这里定义传递的参数
        data: {
          userInfo: app.globalData.userInfo
        },
        success: res => {
          let temp = res.data.data
          console.log(temp)

        }
      })
      return 1
    },


    //用户起床  数据库type列为1
    WakeUp: function () {
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

        }
      })
    },

    //用户睡觉  数据库type列为2
    Sleep: function () {
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

        }
      })
    } ,

    //计算总学习时长
    CalculateTotalTime: function () {
      wx.request({
        url: config.service.CalculateTotalTimeUrl,
        method: 'post',
        //这里定义传递的参数
        data: {
          userInfo: app.globalData.userInfo
        },
        success: res => {
          let temp = res.data.data
          console.log(temp)

        }
      })
    } ,


    //计算总的学习天数
    CalculateTotalDay: function () {
      wx.request({
        url: config.service.CalculateTotalDayUrl,
        method: 'post',
        //这里定义传递的参数
        data: {
          userInfo: app.globalData.userInfo
        },
        success: res => {
          let temp = res.data.data
          console.log(temp)

        }
      })
    } ,


    //计算每日平均学习时长
    CalculateAverage: function () {
      wx.request({
        url: config.service.CalculateAverageUrl,
        method: 'post',
        //这里定义传递的参数
        data: {
          userInfo: app.globalData.userInfo
        },
        success: res => {
          let temp = res.data.data
          console.log(temp)

        }
      })
    }, 

    
    //得到今天的学习日程和睡眠时间
    GetToday: function () {
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
      var ss = timestamp-s-m*60-h*60*60
      var ee = ss+24*60*60
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
          let temp = res.data.data
          console.log(temp)

        }
      })
    } ,


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
          console.log(temp)

        }
      })
    } 




})
