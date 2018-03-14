// pages/orderDetail/orderDetail.js
var app=getApp();
Page({
  data:{
    orderinfo:"",
    orderId:0,
    orderData:{},
    proData:[],
    cancelH:true,
    getH:true,
    isCancel:false,
    cancelR:"",
    show2:true,
    show3:true,
  },
  cancelOrder: function (e) {
    var that=this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/cancleorder', //接口地址
      data: {
        order_id: that.data.orderId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        if (res.data.status == 1){
          wx.showToast({
            title: '操作成功！',
            success:function(){
              wx.navigateTo({
                url: '/pages/order/orderList/orderList',
              });
            }
          })
        }
      }
    });
  },
  bindChange: function (e) {
    var that=this;
    var val = e.detail.value
    that.setData({
      cancelR: that.data.cancelList[val]
    })
  },
  confirmC:function(e){
    var that=this;
    that.setData({
      isCancel:!that.data.isCancel,
      cancelH:false,
      osH:true,
      ordersH:true,
      getH:true,
      status:"已取消"
    })
    
  },
  close:function(e){
    var that=this;
    that.setData({
      isCancel:!that.data.isCancel
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var orderId = options.orderId;
    console.log("orderId=="+orderId);
    this.setData({
      orderId:options.orderId,
    })
    
    console.log(orderId+"------------orderId")
    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
            console.log(res.data)
            var openid=res.data;
            wx.request({
              url: app.d.ceshiUrl + '/Api/Order/order_details', //接口地址
              data: {
                order_id:that.data.orderId,
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method:"POST",
              success: function(res) {
                var status = res.data.status;
                if(status == 1){
                  var ord = res.data.ord;
                  if (ord.sendername2){
                    that.setData({
                      show2:false
                    })
                  }
                  if (ord.sendername3) {
                    that.setData({
                      show3: false
                    })
                  }

                  that.setData({
                    orderData:ord
                  })
                }else{
                  wx.showToast({
                    title: res.data.err,
                    duration:2000
                  })
                }
                console.log("=============================")
                console.log(ord)
              },
              fail:function(){
                wx.showToast({
                  title: '请检查网络连接',
                  duration:2000
                })
              }
            })
            
        } 
      })
    });
    
  },
  //支付接口
  payPage:function(e){
    var that=this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay', //接口地址
      data: {
        order_sn: that.data.orderData.order_sn,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method:"GET",
      success: function(res) {
        console.log(res.data)
        if (res.data.status == 1){
          var arr = res.data.arr;
          wx.requestPayment({
            'timeStamp': arr.timeStamp,
            'nonceStr': arr.nonceStr,
            'package': arr.package,
            'signType': arr.signType,
            'paySign': arr.paySign,
            'success': function (res) {
              //支付成功 requestPayment:ok
              wx.navigateTo({
                url: '/pages/order/orderList/orderList',
              })
            }
          })
        }else{
          wx.showToast({
            title: '系统错误！'
          })
        }
        
      }
    })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})