// pages/address/deliverAddress/deliverAddress.js
var app = getApp();
Page({
  data: {
    addressList: [],
    radioindex:'',
    pro_id:0,
    num:0,
    cartId:0,
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  setDefault: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    var currentPageS=getCurrentPages()[0].data;
    currentPageS.toWh=true;
    currentPageS.toWhC=false;
    var i;
    var addressL=that.data.addressList;
    for(i=0;i<addressL.length;i++){
      if(addressL[i].id==addrId){
        currentPageS.name2=addressL[i].name;
        currentPageS.phone2=addressL[i].tel;
        currentPageS.province2 = addressL[i].address_xq;
      }
    }
    // console.log("-------------");
    // console.log(addressL);
    // console.log(currentPageS.name2);
    // console.log("-------------");
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid: app.d.userId,
        addr_id: addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var status = res.data.status;
        var cartId = that.data.cartId;
        if (status == 1) {
          wx.navigateBack({
            
          })
          if (cartId) {
            // wx.redirectTo({
            //   url: '../../order/pay?cartId=' + cartId,
            // });
            wx.navigateBack();
            return false;
          }

          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });

          that.DataonLoad();
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  // 删除地址操作
  delAddress: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Address/del_adds',
          data: {
            user_id: app.d.userId,
            id_arr: addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {// 设置请求的 header
            'Content-Type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
            // success
            var status = res.data.status;
            if (status == 1) {
              that.DataonLoad();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          },
          
        });
      }
    });

  },
  DataonLoad: function () {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          addressList: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options)
    var that = this;
    var cartId = options.cartId;
    console.log(cartId);

    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id:app.d.userId,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == ''){
          var address = []
        }
        that.setData({
          addressList: address,
          cartId:cartId,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration:2000
        })
      },
      complete: function () {
        // complete
      }
    })
  },

  chooseAddress: function (e) {
    var that = this;
    var currentPageS=getCurrentPages()[0].data;
    currentPageS.toWh=true;
    currentPageS.toWhC=false;
    var i;
    var addressid = e.currentTarget.dataset.addressid;
    var addressL = that.data.addressList;
    console.log("11111111")
    console.log(addressL[addressid]);
    wx.setStorageSync("curadd", addressL[addressid]);
    wx.navigateTo({url:'/pages/index/index'});

  },
//添加地址--跳转到addReceiverAddress
  addAddress:function(e){
    wx.navigateTo({
      url: '../addReceiverAddress/addReceiverAddress',
      success: function(res){
        // success
      //  console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          addressList: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})