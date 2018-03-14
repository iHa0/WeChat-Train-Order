//app.js

App({
  d: {
    hostUrl: 'https://www.1xhgx1.cn/index.php',
    hostImg: 'https://www.1xhgx1.cn',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 1,
    appId: "",
    appKey: "",
    ceshiUrl: 'https://www.1xhgx1.cn/index.php',
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that=this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});
    this.getUserInfo(function( resp ){
      var openid = wx.getStorageSync("onlyid")
      that.loginIn(openid, resp);
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
          //发起网络请求
            wx.request({
              url: that.d.hostUrl + '/Api/Login/getOpenid',
              data: {
                js_code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "POST",
              success: function (res1) {
                var openid = res1.data.openid;
                wx.setStorageSync("onlyid", openid)
                // console.log(res.data.openid)
                wx.getUserInfo({
                  success: function (res) {
                    // console.log(res)
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              // console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    url: 'https://www.1xhgx1.cn/index.php'
  },
  loginIn:function(openid,user){
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: this.d.hostUrl + '/Api/Login/authlogin',
      method:"post",
      data:{
        openid: openid,
        NickName: user.nickName,
        HeadUrl: user.avatarUrl,
        gender: user.gender
      },
      success:function( res ){
        var resp = res.data;
        wx.hideLoading();
        if(resp.status == 1){
          var info = res.data.arr;          
          that.d.userId = info.ID;
          that.d.NickName = info.NickName;
          that.d.HeadUrl = info.HeadUrl;
        }else{
          var err = res.data.err;          
          wx.showModal({
            title: '错误提示',
            content: err,
          })
        }
      }
    })
  }

})