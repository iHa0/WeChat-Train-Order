// pages/order/order.js
var app = getApp();
Page({
  data:{
    orderList:[],
    orderData:{},
    proData:[],
    refundpage:0,
    isStatus:'pay',
    page:'0',
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '0416-2551137', //电话号码
      success:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    
            that.getOrderlist();
  },
  getOrderlist:function(){
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/index', //接口地址
      data: {
        uid: app.d.userId,//1  app.d.userId
        page: that.data.page,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        var status = res.data.status;
        var list = res.data.ord;
        var newarr = that.data.orderList.concat(list);
        var page = that.data.page;
        if(!list || list.length == 0){
          page = -1;
        }
        that.setData({
          orderList: newarr,
          page: page
        })
      }
    })
  },
  viewOrderD:function(e){
    var that=this;
    var orderid=e.currentTarget.dataset.orderid;
    var i;
    var orderL = that.data.orderList;

    for(i=0;i<orderL.length;i++){
      if(orderL[i].orderid == orderid){
        var orderS=orderL[i].status;
      }
    }
  //   app.getUserInfo(function(){
  //     wx.getStorage({
  //       key: 'onlyid',
  //       success: function(res) {
  //           // console.log(res.data)
  //           var openid=res.data;
  //           wx.request({
  //             url: app.globalData.url+'/wx/trade/getInfo', //接口地址
  //             data: {
  //               openid:openid,
  //               orderid:orderid
  //             },
  //             header: {
  //                 'content-type': 'application/json'
  //             },
  //             method:"GET",
  //             success: function(res) {
  //               console.log(res)
                
  //               if(orderS=="配送中" || orderS=="已送达"){
  //                 wx.navigateTo({
  //                   url: '../orderDetailView/orderDetailView',
  //                   success: function(res){
  //                     // success
  //                   },
  //                   fail: function() {
  //                     // fail
  //                   },
  //                   complete: function() {
  //                     // complete
  //                   }
  //                 })
  //               }else{
  //                 wx.navigateTo({
  //                   url: '../orderDetail/orderDetail',
  //                   success: function(res){
  //                     // success
  //                   },
  //                   fail: function() {
  //                     // fail
  //                   },
  //                   complete: function() {
  //                     // complete
  //                   }
  //                 })
  //               }
                  
  //             }
  //           })
            
  //       } 
  //     })
  //   })
  },
  onPullDownRefresh:function(){
    
  },
  onReachBottom:function(){
    console.log("底部");
    if (this.data.page != -1) {
      this.setData({
        page: +this.data.page + 1
      })
      this.getOrderlist();
    }
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