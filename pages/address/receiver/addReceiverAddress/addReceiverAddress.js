// pages/addDeliverAddress/addDeliverAddress.js
var tcity = require("../../../../utils/citys.js");
var app = getApp();
Page({
  data: {
    defaultSize: "default",
    loading: false,
    plain: false,
    disabled: false,

    provinces: [],
    province: "",
    provinceId:'',
    cityId:'',
    countyId:'',
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,

    userName: "",
    phone: "",
    address: "",
    

    toast: true
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    var provinceId;
    var cityId;
    var countyId;
    console.log('e', e);
    this.setAdd(val[0], val[1],val[2]);

  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;

    tcity.init(that);
    this.setAdd(0,0,0);
    
  },

  userNameInput: function (e) {
    this.data.userName = e.detail.value;
  },
  phoneInput: function (e) {
    this.data.phone = e.detail.value;
  },
  addressInput: function (e) {
    this.data.address = e.detail.value;
  },
  saveAddress: function (e) {
    var that = this; 
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          var openid = res.data;
          var userName = that.data.userName;
          var phone = that.data.phone;
          var province = that.data.province;
          var city = that.data.city;
          var county = that.data.county;
          var address = that.data.address;
          var provinceId = that.data.provinceId;
          var cityId = that.data.cityId;
          var countyId = that.data.countyId;

          var addrId = e.currentTarget.dataset.id;
          var currentPageS = getCurrentPages()[0].data;
          currentPageS.toWh = true;
          currentPageS.toWhC = false;
          var i;
          var addressL = that.data.address;
          currentPageS.name2 = userName;
          currentPageS.phone2 = phone;
          currentPageS.province2 = province;
          currentPageS.city2 = city;
          currentPageS.county2 = county;
          currentPageS.address2 = address;
          if (userName != "") {
          } else {
            wx.showModal({
              title: '提示',
              content: '请输入姓名',
            })
            return;
          }

          if (phone != "" && phone.length == 11) {

          } else {
            wx.showModal({
              title: '提示',
              content: '请输入11位手机号码',
            })
            return;
          }

          if (province != "" && city != "" && county != "") {
          } else {
            wx.showModal({
              title: '提示',
              content: '请选择省市区',
            })
            return;
          }

          if (address != "") {
          } else {
            wx.showModal({
              title: '提示',
              content: '请填写地址',
            })
            return;
          }
          wx.request({
            url: app.d.ceshiUrl + '/Api/Address/add_adds', //接口地址
            data: {
              user_id:app.d.userId,
              receiver: userName,
              tel: phone,
              sheng: provinceId,
              city: cityId,
              quyu: countyId,
              adds: address,
              code:'121000',
            },
            method: "POST",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              var status = res.data.status;
              if(status==1){
                wx.showToast({
                  title:'保存成功！',
                  duration:1500,
                  success:function(){
                    wx.navigateBack()
                  }
                })

              }
            }
          })

        }
      })
  },
  setAdd:function(one,two,three){
    var that = this;
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    var sub = cityData[one] && cityData[one].sub;
    console.log( sub )
    if (!sub){
      sub = cityData[0].sub;
    }
    for (let i = 0; i < sub.length; i++) {
      citys.push(sub[i].name)
    }
    if (two >= sub.length){
      two = 0;
    }
    var city = sub[two] && sub[two].sub;
    console.log(city)
    for (let i = 0; i < city.length; i++) {
      countys.push(city[i].name)
    }
    if (three >= city.length) {
      three = 0;
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[one].name,
      'provinceId': cityData[one].code,
      'cityId': cityData[one].sub[two].code,
      'city': cityData[one].sub[two].name,
      'county': cityData[one].sub[two].sub[three].name,
      'countyId': cityData[one].sub[two].sub[three].code
    })
    console.log('初始化完成');
  }
})