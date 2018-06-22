/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://scgynk18.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // test_get
        test_getUrl: `${host}/weapp/test_get`,

        // UserRegistion
        UserRegistionUrl: `${host}/weapp/UserRegistion`,

        // StopWatch
        StopWatchUrl: `${host}/weapp/StopWatch`,

        // StartWatch
        StartWatchUrl: `${host}/weapp/StartWatch`,

        // CheckWatch
        CheckWatchUrl: `${host}/weapp/CheckWatch`,

        // WakeUp
        WakeUpUrl: `${host}/weapp/WakeUp`,

        // Sleep
        SleepUrl: `${host}/weapp/Sleep`,

        // CalculateTotalTime
        CalculateTotalTimeUrl: `${host}/weapp/CalculateTotalTime`,

        // CalculateTotalDay
        CalculateTotalDayUrl: `${host}/weapp/CalculateTotalDay`,

        // CalculateAverage
        CalculateAverageUrl: `${host}/weapp/CalculateAverage`

    }
};

module.exports = config;
