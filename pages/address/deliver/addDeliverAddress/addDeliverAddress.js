// pages/addDeliverAddress/addDeliverAddress.js
//======获取三级城市列表=======
var tcity = require("../../../../utils/citys.js");
var app = getApp();
Page({
  data: {
    defaultSize: "default",
    loading: false,
    plain: false,
    disabled: false,
    userName1: "",
    orderId1: "",
    idNumber1: "",
    userName2: "",
    orderId2: "",
    idNumber2: "",
    userName3: "",
    orderId3: "",
    idNumber3: "",
    imgUrls: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg",
    imgUrls2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg",
    imgUrls3: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg",
    ticketNum: 0,
    toast: true,
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },

  userNameInput1: function (e) {
    this.data.userName1 = e.detail.value;
    this.setData({
      userName1: e.detail.value
    })
  },
  orderIdInput1: function (e) {
    this.data.orderId1 = e.detail.value;
    this.setData({
      orderId1: e.detail.value
    })
  },
  idNumberInput1: function (e) {
    this.data.idNumber1 = e.detail.value;
    this.setData({
      idNumber1: e.detail.value
    })
  },

  userNameInput2: function (e) {
    this.data.userName2 = e.detail.value;
    this.setData({
      userName2: e.detail.value
    })
  },
  orderIdInput2: function (e) {
    this.data.orderId2 = e.detail.value;
    this.setData({
      orderId2: e.detail.value
    })
  },
  idNumberInput2: function (e) {
    this.data.idNumber2 = e.detail.value;
    this.setData({
      idNumber2: e.detail.value
    })
  },


  userNameInput3: function (e) {
    this.data.userName3 = e.detail.value;
    this.setData({
      userName3: e.detail.value
    })
  },
  orderIdInput3: function (e) {
    this.data.orderId3 = e.detail.value;
    this.setData({
      orderId3: e.detail.value
    })
  },
  idNumberInput3: function (e) {
    this.data.idNumber3 = e.detail.value;
    this.setData({
      idNumber3: e.detail.value
    })
  },

  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;


    var putadd = wx.getStorageSync("putadd");
    if (putadd.name1 && putadd.orderId1 && putadd.idNumber1) {
      this.setData({
        fromWh: true,
        userName1: putadd.name1,
        orderId1: putadd.orderId1,
        idNumber1: putadd.idNumber1,
        imgUrls: putadd.imgUrls,
        imgUrls2: putadd.imgUrls2,
        imgUrls3: putadd.imgUrls3,
        userName2: putadd.name2,
        orderId2: putadd.orderId2,
        idNumber2: putadd.idNumber2,
        userName3: putadd.name3,
        orderId3: putadd.orderId3,
        idNumber3: putadd.idNumber3,


      })
    }
  },


  saveAddress: function (e) {
    var userName1 = this.data.userName1;
    var orderId1 = this.data.orderId1;
    var idNumber1 = this.data.idNumber1;

    var userName2 = this.data.userName2;
    var orderId2 = this.data.orderId2;
    var idNumber2 = this.data.idNumber2;

    var userName3 = this.data.userName3;
    var orderId3 = this.data.orderId3;
    var idNumber3 = this.data.idNumber3;
    if (userName1 != "" || idNumber1 != "" || orderId1.length == 10) {
      this.data.ticketNum = 1;
      this.setData({
        ticketNum: 8,
      })
    }


    if (userName2 != "" || idNumber2 != "" || orderId2.length == 10) {
      this.data.ticketNum = 2;
      this.setData({
        ticketNum: 16,
      })
    }

    if (userName3 != "" || idNumber3 != "" || orderId3.length == 10) {
      this.data.ticketNum = 3;
      this.setData({
        ticketNum: 24,
      })
    }
    var that = this;
    wx.getStorage({
      key: 'onlyid',
      success: function (res) {

        var userName1 = that.data.userName1;
        var orderId1 = that.data.orderId1;
        var idNumber1 = that.data.idNumber1;

        var userName2 = that.data.userName2;
        var orderId2 = that.data.orderId2;
        var idNumber2 = that.data.idNumber2;

        var userName3 = that.data.userName3;
        var orderId3 = that.data.orderId3;
        var idNumber3 = that.data.idNumber3;

        var ticketNum = that.data.ticketNum;
        var imgUrls = that.data.imgUrls;
        var imgUrls2 = that.data.imgUrls2;
        var imgUrls3 = that.data.imgUrls3;

        if (userName1 != "") {
          console.log()
        } else {
          that.setData({
            toast: false,
            toastTxt: "请输入姓名"
          })
          setTimeout(function () {
            that.setData({
              toast: true,
              toastTxt: ""
            })
          }, 1000)
          return;
        }

        if (orderId1.length == 10) {
          console.log()
        } else {
          that.setData({
            toast: false,
            toastTxt: "请输入10位订单号"
          })
          setTimeout(function () {
            that.setData({
              toast: true,
              toastTxt: ""
            })
          }, 1000)

          return;
        }

        if (idNumber1 != "" && idNumber1.length == 18) {
          console.log()
        } else {
          that.setData({
            toast: false,
            toastTxt: "请输入18位身份证号码"
          })
          setTimeout(function () {
            that.setData({
              toast: true,
              toastTxt: ""
            })
          }, 1000)

          return;
        }
        // 判断票的数量





        if (imgUrls && imgUrls.length > 0) {
        } else {
          wx.showModal({
            title: '提示',
            content: '请上传图片',
          })
          return;
        }


        var putadd = {
          name1: userName1,
          orderId1: orderId1,
          idNumber1: idNumber1,
          name2: userName2,
          orderId2: orderId2,
          idNumber2: idNumber2,
          name3: userName3,
          orderId3: orderId3,
          idNumber3: idNumber3,
          ticketNum: ticketNum,
          imgUrls: imgUrls,
          imgUrls2:imgUrls2,
          imgUrls3:imgUrls3,
        }
        console.log(putadd);
        wx.setStorageSync("putadd", putadd);
        wx.showModal({
          title: '提示',
          content: '上传成功！',
        })
        wx.navigateTo({ url: '/pages/index/index' });
      }
    })
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
              imgUrls = app.d.hostImg + data.data;
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



  choseimg2: function () {
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
            var imgUrls2 = that.data.imgUrls2;
            if (typeof data != 'object') data = JSON.parse(data);
            if (data.flag == "success") {
              imgUrls2 = app.d.hostImg + data.data;
              that.setData({
                imgUrls2: imgUrls2
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



  choseimg3: function () {
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
            var imgUrls3 = that.data.imgUrls3;
            if (typeof data != 'object') data = JSON.parse(data);
            if (data.flag == "success") {
              imgUrls3 = app.d.hostImg + data.data;
              that.setData({
                imgUrls3: imgUrls3
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

  // 删除上传图片
  removeimg: function (e) {
    var idex = e.currentTarget.dataset.index;
    var imgUrls = this.data.imgUrls;
    // imgUrls.splice(idex, 1);
    this.setData({
      imgUrls: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"
    })
  },



  removeimg2: function (e) {
    var idex = e.currentTarget.dataset.index;
    var imgUrls = this.data.imgUrls;
    // imgUrls.splice(idex, 1);
    this.setData({
      imgUrls2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"
    })
  },


  removeimg3: function (e) {
    var idex = e.currentTarget.dataset.index;
    var imgUrls = this.data.imgUrls;
    // imgUrls.splice(idex, 1);
    this.setData({
      imgUrls3: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517238803427&di=7ed5841062719c04cd5173fb271e927c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"
    })
  }

})