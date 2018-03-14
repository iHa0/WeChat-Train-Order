//index.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    imgUrls: "",
    imgUrls2: "",
    imgUrls3: "",
    dates: [
    ],
    cartId: 0,
    itemData: {},
    address: {},
    total: 0,
    vprivce: 0,
    addemt: 1,
    vou: [],
    paytype: 'weixin',
    remark: '',
    addrId: 0,
    vid: 0,
    name: '',
    orderId: '',
    idNumber: '',
    buynum: 1,
    productId: 1,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    isTime: false,

    fromWh: false,
    toWh: false,
    arr: "",
    toast: true,
    toastTxt: "",
    estimatefee: "￥8.00",
    feeH: true,
    price: 0,
    nameTwo: "",
    show2:true,
    show3:true,


  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  comingSoon: function (e) {
    wx.showToast({
      title: '敬请期待！',
    })
  },

  close: function (e) {
    this.setData({
      isTime: !this.data.isTime
    })
  },

  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  //======个人信息=======
  sendAddress: function (e) {
    var that = this;
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          var openid = res.data;
          wx.navigateTo({
            url: '../address/deliver/deliverAddress/deliverAddress?openid=' + openid,
            success: function (res) {
              // success
              //  console.log(res)
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }
      })
    })
  },

  //=======收件信息========
  receiverAddress: function (e) {
    var that = this;
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          var openid = res.data;
          wx.navigateTo({
            url: '../address/receiver/receiverAddress/receiverAddress?openid=' + openid,
            success: function (res) {
              // success
              //  console.log(res)
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }
      })
    })
  },
  fromW: function (e) {
    wx.navigateTo({
      url: '../address/deliver/addDeliverAddress/addDeliverAddress?id=1',
      success: function (res) {
        // success
        //  console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  toW: function (e) {
    wx.navigateTo({
      url: '../address/receiver/addReceiverAddress/receiverAddress',
      success: function (res) {
        //  success
        //   console.log(res)
      },
      fail: function () {
        //  fail
      },
      complete: function () {
        //  complete
      }
    })
  },
  onLoad: function (options) {
    this.setData({
    })
    // 获取缓存
    // 收件人地址缓存
    var curadd = wx.getStorageSync("curadd");
    // 票面信息缓存
    var putadd = wx.getStorageSync("putadd");
    console.log(curadd, putadd)

    if (putadd.name1 && putadd.orderId1 && putadd.idNumber1) {
      this.setData({
        fromWh: true,
        name: putadd.name1,
        orderId: putadd.orderId1,
        idNumber: putadd.idNumber1,
        imgUrls: putadd.imgUrls,
        imgUrls2: putadd.imgUrls2,
        imgUrls3: putadd.imgUrls3,
        nameTwo: putadd.name2,
        orderIdTwo: putadd.orderId2,
        idNumberTwo: putadd.idNumber2,
        nameThr: putadd.name3,
        orderIdThr: putadd.orderId3,
        idNumberThr: putadd.idNumber3,
        price: putadd.ticketNum,

      })
    }

    if (putadd.name2){
      this.setData({
        show2:false,
      })
    }
    if (putadd.name3) {
      this.setData({
        show3: false,
      })
    }

    if (curadd.name && curadd.tel && curadd.address_xq) {
      this.setData({
        toWh: true,
        name2: curadd.name,
        phone2: curadd.tel,
        address2: curadd.address_xq
      })
    }
  },
  addShopCart: function (e) { //添加到购物车
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/add',
      method: 'post',
      data: {
        uid: app.d.userId,
        pid: that.data.productId,
        num: that.data.buynum,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // //--init data        
        var data = res.data;
        console.log("res.data");
        console.log(data);
        if (data.status == 1) {
          that.setData({
            cartId: data.cart_id
          })
          console.log(that.data.cartId);

        } else {
          wx.showToast({
            title: "添加cartid错误",
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
    });
  },
  confirmOrder: function (e) {
    var that = this;
    var senderName = that.data.name;
    var orderId = that.data.orderId;
    var idNumber = that.data.idNumber;

    var senderName2 = that.data.nameTwo;
    var orderId2 = that.data.orderIdTwo;
    var idNumber2 = that.data.idNumberTwo;

    var senderName3 = that.data.nameThr;
    var orderId3 = that.data.orderIdThr;
    var idNumber3 = that.data.idNumberThr;

    var receiverName = that.data.name2;
    var receiverPhone = that.data.phone2;
    var receiverAddress = that.data.address2;


    if (that.data.imgUrls && that.data.imgUrls.length > 0) {
      var imgUrls = that.data.imgUrls;
    } else {
      wx.showToast({
        title: '票面图片为空！'
      })
      return;
    }
    var imgUrls2 = that.data.imgUrls2;
    var imgUrls3 = that.data.imgUrls3;
    console.log(imgUrls+"=="+imgUrls2+"=="+imgUrls3)


    wx.request({
      url: app.d.ceshiUrl + '/Api/Payment/payment',
      method: 'POST',
      data: {
        uid: app.d.userId,
        senderName: senderName,
        orderId: orderId,
        idNumber: idNumber,

        // 新增
        senderName2: senderName2,
        orderId2: orderId2,
        idNumber2: idNumber2,
        senderName3: senderName3,
        orderId3: orderId3,
        idNumber3: idNumber3,


        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,

        imgUrls:imgUrls+","+imgUrls2+","+imgUrls3,

        imgUrls2: imgUrls2,
        imgUrls3: imgUrls3,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        if (data.status == 1) {
          //微信支付

          that.payPage(data.arr.order_sn);
          wx.clearStorageSync(putadd);


        } else {
          wx.clearStorageSync(putadd);

          wx.showToast({
            title: '下单失败！',
            duration: 2500
          });
        }

      },
      fail: function (e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        })
      },
      complete: function () {
        // complete
      }
    })

  },
  payPage: function (order_sn) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay', //接口地址
      data: {
        order_sn: order_sn,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 1) {
          var arr = res.data.arr;
          wx.requestPayment({
            'timeStamp': arr.timeStamp,
            'nonceStr': arr.nonceStr,
            'package': arr.package,
            'signType': arr.signType,
            'paySign': arr.paySign,
            'success': function (res) {
              //支付成功 requestPayment:ok
              wx.showToast({
                title: '支付成功'
              })
              wx.navigateTo({
                url: '/pages/order/orderList/orderList',
              })
            }
          })
        } else {
          wx.showToast({
            title: '支付失败'
          })
        }

      }
    })

  },
  onShow: function () {

  },
  //图片上传
  choseimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // success
        var files = res.tempFilePaths;
        console.log(files);
        wx.showLoading({
          title: '图片上传中'
        });
        wx.uploadFile({
          url: app.d.ceshiUrl + '/Api/Index/wxupload',
          filePath: files[0],
          name: 'pic',
          success: function (res) {
            var data = res.data;
            console.log(data);
            var imgUrls = that.data.imgUrls;
            if (typeof data != 'object') data = JSON.parse(data);
            if (data.flag == "success") {
              imgUrls.push(app.d.hostImg + data.data);
              that.setData({
                imgUrls: imgUrls
              })
            } else {
              wx.showModal({
                title: '错误',
                content: data.message
              })
            }

          }.bind(this),
          complete: function () {
            wx.hideLoading();
          }
        });
      }.bind(this)
    })
  },
  removeimg: function (e) {
    var idex = e.currentTarget.dataset.index;
    var imgUrls = this.data.imgUrls;
    imgUrls.splice(idex, 1);
    this.setData({
      imgUrls: imgUrls
    })
  }
})
