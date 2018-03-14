var cityData = [
  {
    "name": "辽宁省",
    "code": "210000",
    "sub": [
      {
        "name": "锦州市",
        "code": "210700",
        "sub": [
          {
            "name": "古塔区",
            "code": "210702"
          },
          {
            "name": "凌河区",
            "code": "210703"
          },
          {
            "name": "松山新区",
            "code": "210704"
          }
        ]
      }
    ]
  }
];


function init(that) {
  that.setData({
    'cityData': cityData
  });
}

module.exports = {
  init: init
}