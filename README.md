# 基于微信小程序的火车票送票助手-2.60

1	软件概述
=====

1.1系统用途
---------
火车票送票小程序是对通过12306买票后的用户提供的一种便捷的服务，他是基于微信小程序的，面向的是广大的购票客户。当客户在12306购买车票后，通过我们的小程序直接填写相关的个人信息和地址信息，我们的铁路工作人员会通过系统将火车票取出，并且通过专人寄送，为很多赶时间的人带去便利，本软件只需要通过微信扫码就可以使用，极大的方便了用户访问与信息的填写，具备基础的计算机知识的人都可对本程序进行操作。
随着科学技术的发展，在网上订购火车票的人越来越多，特别是节假日的时候顾客扎堆进入火车站取票，这对火车站的人数冲击和诸多不确定性提供了安全隐患。有些客户可能因为在火车站取票的时候，因为排队的人数过多而错过了自己的班车，这对客户的经济损失造成了很大的影响，并且有些客户可能赶时间，错过班车可能导致他们的行程需要有很大的改变。我们的小程序就是为了改变这种局面，为了给购票送送去便利，这可以有效的调高他们的效率，不需要再花费大量时间排队取票，到站检票就可以乘坐火车。为购票者提供了很大的便捷性和高效性。

1.2软件功能简介
---------
火车票送票小程序可以实现每个人按照微信身份登录，无需输入账号密码就可以获得属于每个用户的专属数据。改软件可以自动调用每个人微信的个人信息，比如用户名、头像等，通过这些信息和相关的ID我们为每位用户自动创建数据。直接进入程序后，就是填写相关的票面信息。为了方便某些特殊的旅客，我们贴心的将可取的火车票数量增加到了三张，也就是话说，用户可以同时取三张火车票，并且收取的费用和一张是一样的。
在信息的填写处，主要要填写的信息包括取票人的姓名、身份证、订单号，还需要上传一张带有订单号的截图。我们后台的工作人员会通过这些信息核对，如果通过，就取出该乘客的车票。然后用户还需要填写邮寄的地址信息：手机号码、收件人姓名，收件地址。程序为每位用户都添加了一个属于自己的地址簿，用户可以在地址簿中添加个人的邮寄地址信息，也可以修改和删除，这主要是为了方便每个用户在下次取票的时候，直接可以选择这些信息而不需要重复填写。这为我们的用户带去了高效。
填写完这些信息之后，程序会自动跳转到主页面，并且下面出现“支付8元”的支付信息，我们的程序对接了微信支付，只需要点击一下按钮，输入微信的支付密码就可以完成本次的购票，完成支付之后，你的订单信息会显示在“我的订单”一栏中，通过这一栏的信息，用户可以了解个人的信息，填写情况等，如果发现填写的票面有问题，或者因为时间与日程的改变想要退票或者改签，这个时候就可以使用程序的“取消订单”，当用户点击“取消订单”按钮的时候，我们的程序会让用户选择取消的理由，当用户发起取消申请时，后台管理人员会通过用户留下的手机号码与用户进行沟通，确定无误后，将本次订单的钱款退还到用户的钱包里。

1.3软件功能概述<br>
1.3.1用户登录模块
----
本程序不需要用户通过特定的登录页面进行用户身份的确认，而是通过用户登录的微信直接调取用户的信息，也就是话说，只要用户登录了微信，就是登录了我们的软件，所以我们的登录模块就是调取了微信的API实现每个用户身份的验证。

1.3.2取票人信息填写模块
-----------
信息模块的填写是本程序比较重要的一个环节，通过取票人的信息填写，工作人员才可以将火车票取出，所以我们为了保证用户上传的火车票的真实性和为了提高核对的效率，我们添加了上传火车票面的信息栏，通过这些信息，工作人员就可以为用户取出他订购的火车票。

1.3.3邮寄地址填写模块
--------
当工作人员为用户提出他们订购的火车票时，还需要将该车票寄送到用户的手上，所以此模块只要就是为了实现这个功能。用户将自己的地址填写在相对应的地址栏中，提交该地址我们的工作人员就可以直接按照这些信息将票送至用户手中。并且该模块也有地址簿的功能，为用户将每次不同的邮寄地址保存 ，用户可以根据自己的情况添加删除部分地址信息，也可以将某个地址设置为默认地址。设置默认地址后，下一次的第一选项就是该地址。

1.3.4支付管理
---------
通过调用微信小程序的支付功能，用户可以很方便的实现支付功能。如果支付失败，那么这次订单将显示为“未支付”状态，用户可以通过“我的订单”页面重新支付。

1.3.5对订单查看功能
---------
只要用户下单，所有的订单信息都会显示在“我的订单”模块中，用户可以自行查看这些订单的信息，多某些问题也可以直接联系软件下方的客服热线。

## 联系方式 sinhao@live.com
