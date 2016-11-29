TODO:636773
TODO:1. 首页销售大图还是按照第一个weixin版本的做 2. 销售模式分享的文字不对
### 20160415 原来计划加入的注册、登陆互相跳转，因为考虑到跳转后没有带openid之类信息，所以暂时不加入


# 华天旅游网 移动版 开发笔记

## Windows平台安装开发环境

1. 先用 NPM install -g cordova 安装好
2. 安装 android studio
3. 安装SDK 22，不过要注意可能版本不同要求不同
4. 现在Cordova 5自带了crosstalk，不用也没办法额外安装

## WEB前端用库
本来是准备用Material-design-lite做的，但是发现在中文化、国内还有国内社区上有很大的制约，还是放弃了。
还有MVVM框架本来准备用angularjs，结果又升级了，完全重新开发发现调用jsonp接口老是出问题，换get调用完全没问题，研究了一天无果，遂放弃还是用正美的avalon省心点。
ajax载入数据用jquery，一来是amazeui依赖并且自带了，二来是avalon的也要额外装组件还不如直接jquery省心算了。

### 关于登陆

登录实际上是没办法坐在APP里面的，因为APP跳出去以后，没办法调回来，因为网页无法调回到APP的本地页面上来。
所以，APP是不能登录的。理论上微信可以用QQ或者微信登录，支付宝、微博等可以用在网页登录上。

| 名称    | 接口地址                        |
| ----- | --------------------------- |
| 支付宝接口 | /user/zhifubao_Login.action |
| 支付宝登陆 | /user/zhifubao_Login.action |



### 获取新闻的接口DEMO：
http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&infoID=1215

http://www.htyou.com/common/websinfo_queryHTClass.action?datatype=json&classId=722

`注意: parentId的写法在json接口中改成classParent，例如：
http://www.htyou.com/common/websinfo_queryHTClass.action?datatype=json&classParent=369`

### 获取销售人员信息的sample（同样是使用新闻接口）:
http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&infoID=431
销售人员的类型必须是"info_class": 421

### 获取用户账单的接口

参数 userid

/user/htuser_getTourOrderDetail 



### 从UID获取销售人员信息的sample

http://www.htyou.com/common/websinfo_queryWebsInfos.action?url=oiZKXjjPYlSmiN3yndvDLZ7-E-jA&submit=ajax


adpic_queryAdPic ok

待remote化处理接口
/tour/tourpro_queryTourOtherData.action?queryTourOtherType=1_2_3_4&datatype=json

<@s.action name='websinfo_queryWebsInfos' infoClass="414" pageSize='4' namespace='/common' executeResult='false' />
//暂缺

<@s.action name='tourpro_listTourProWithQuery' commendtype='14' namespace='/tour' executeResult='false' pagesize='6'/>
对应ipad接口里面的/mobile/ipad_queryTourLine.action


'''
订单提交和微信版一样，但是要多增加一个tourOrderVO.order_source=16 用来确定字符集
MobileTourOrderAction
addTourOrder
'''

		  机票json 转化方法 
		  /mobile/ticket_queryTicketListApp.action
		  参数 
		  	//fromDate  出发时间
			  //beginCity 出发城市
		    //endCity  到达城市 必填3项目
		
	     // 排序条件
		   // 查询 条件   时间排序  flytimeorder  up down
		   // 按航空公司条件查询 airlines  航空公司縮寫 
		   // 价格排序         brethprice    up down
		   simple:
		   http://www.htyou.com/mobile/ticket_queryTicketListApp.action?fromDate=2015-10-27&fromCity=北京&toCity=长沙
		   
		   返回ticketvo 对象 具体对象构造参考 /WEB-INF/weixin/ticket_show.html


​		   
		   国内机票 仓位查询方法
		     /mobile/ticket_getMoreTickeBrethInFoApp.action
		     
		    参数 sendinfo="${ticketvo.flightlist[i].scvo.head}"
		    sample:
		    http://www.htyou.com/mobile/ticket_getMoreTickeBrethInFoApp.action?sendinfo=<HBS><HEAD>27OCT(TUE) BJSCSX DIRECT ONLY<\/HEAD><HZWZ>a<\/HZWZ><HB><XH>8+<\/XH><HBH>CA1349<\/HBH><DS>DS#<\/DS><CW>FA AA YA BA MA HA KA LA QA GQ SA N3 VQ US TQ EQ M1A V1Q<\/CW><HC>PEKCSX<\/HC><CFSJ>1925<\/CFSJ><DDSJ>2200<\/DDSJ><JX>32A<\/JX><TLCY>0^L<\/TLCY><E>E<\/E><FH>&gt;<\/FH><GXHBH/><CW2/><SUBCW>M1A V1Q<\/SUBCW><OTHER>T3 T2  2:35<\/OTHER><ZDGBYJCW>QA<\/ZDGBYJCW><\/HB><\/HBS>
		    http://www.htyou.com/mobile/ticket_getMoreTickeBrethInFoApp.action?sendinfo=%3CHBS%3E%3CHEAD%3E27OCT(TUE)%20BJSCSX%20DIRECT%20ONLY%3C%2FHEAD%3E%3CHZWZ%3Ea%3C%2FHZWZ%3E%3CHB%3E%3CXH%3E8%2B%3C%2FXH%3E%3CHBH%3ECA1349%3C%2FHBH%3E%3CDS%3EDS%23%3C%2FDS%3E%3CCW%3EFA%20AA%20YA%20BA%20MA%20HA%20KA%20LA%20QA%20GQ%20SA%20N3%20VQ%20US%20TQ%20EQ%20M1A%20V1Q%3C%2FCW%3E%3CHC%3EPEKCSX%3C%2FHC%3E%3CCFSJ%3E1925%3C%2FCFSJ%3E%3CDDSJ%3E2200%3C%2FDDSJ%3E%3CJX%3E32A%3C%2FJX%3E%3CTLCY%3E0%5EL%3C%2FTLCY%3E%3CE%3EE%3C%2FE%3E%3CFH%3E%26gt%3B%3C%2FFH%3E%3CGXHBH%2F%3E%3CCW2%2F%3E%3CSUBCW%3EM1A%20V1Q%3C%2FSUBCW%3E%3COTHER%3ET3%20T2%20%202%3A35%3C%2FOTHER%3E%3CZDGBYJCW%3EQA%3C%2FZDGBYJCW%3E%3C%2FHB%3E%3C%2FHBS%3E


		    返回 seatlist json 文本

		    国际机票仓位 自带查询返回 不需要额外查询

			Test URL:http://localhost:63342/mobile_htyou/www/ticket_list.html?fromCity=%E9%95%BF%E6%B2%99&toCity=%E5%8C%97%E4%BA%AC&fromDate=2015-10-31


select-date=2015-10-31&chengren-fill=1&ertong-fill=0&tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16

http://www.htyou.com/mobile/tourorder_addTourOrder.action?select-date=2015-10-31&chengren-fill=1&ertong-fill=0&tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16


http://www.htyou.com/mobile/tourorder_addTourOrder.action?tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16

```
http://www.htyou.com/mobile/tourorder_addTourOrder.action?jsoncallback=jQuery21408062333955895156_1452652804015&tourOrderVO.order_amount=238&tourOrderVO.preferential_price=238&tourOrderVO.pay_type=121603&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=&tourOrderVO.tourproid=22717&tourOrderVO.jzl_cteamcode=HT-HNS-2160116-00041&tourOrderVO.start_date=2016-01-16&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16&_=1452652804019
```

"pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg",
 pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg"





27OCT(TUE) BJSCSX DIRECT ONLY</HEAD>a</HZWZ>7</XH>CA1349</HBH>DS#</DS>FA AA YA BA MA HA KA LA QA GQ SA N3 VQ US TQ EQ M1A V1Q</CW>PEKCSX</HC>1925</CFSJ>2200</DDSJ>32A</JX>0^L</TLCY>E</E>></FH>M1A V1Q</SUBCW>T3 T2 2:35</OTHER>QA</ZDGBYJCW></HB></HBS>

27OCT(TUE) BJSCSX DIRECT ONLY</HEAD>a</HZWZ>7</XH>CA1349</HBH>DS#</DS>FA AA YA BA MA HA KA LA QA GQ SA N3 VQ US TQ EQ M1A V1Q</CW>PEKCSX</HC>1925</CFSJ>2200</DDSJ>32A</JX>0^L</TLCY>E</E>></FH>M1A V1Q</SUBCW>T3 T2 2:35</OTHER>QA</ZDGBYJCW></HB></HBS>


#### Cordova打包成为APK，安装好以后，偶尔出现“The connection to the server was unsuccessful(file:///android_asset/www/index.html)”的解决方案：
1.


#### 签名
keytool -genkey -v -keystore htyou-release-key.keystore -alias htyou -keyalg RSA -validity 365

**Cordova 5.x开始不用ant.properties了，改在项目root目录下新建build.json代替

#### 多个产品ID列表查询
http://www.htyou.com/mobile/ipad_queryTourLine.action?KeyWords=13518%2012841
keywords后面加上ID，用空格(%20)分开


#### 用户注册登录后 抢券 获取 优惠券 （秒杀订单）
接口地址：
/miaosha/miaosha_addChouJiangOrder.action 

参数：
- userid

返回：
- status 1 成功  102 已抽奖 
- miaoshaname 奖品名称

#### 个人中心查看奖券
接口地址：
- /miaosha/miaosha_queryMiaoShaOrderByGuestId.action

参数：
- userid

返回：
- list<PanicbuyingOrderVO> 活动订单列表

#### 添加出行人接口 addPassengerInfo

接口地址
- /user/htuser_addPassengerInfo.action 

参数
- passengerVO.guestId 用户id		注意：如果没有（未注册用户之类）则填写0
- passengerVO.passengerName     姓名
- passengerVO.passengerIdentify 证件号
- passengerVO.passengerPhone    手机号
- passengerVO.identifytype      证件类型  120702 护照  120701 身份证

测试

```
http://www.htyou.com/user/htuser_addPassengerInfo.action?passengerVO.guestId=636773&passengerVO.passengerName=测试阿顶1&passengerVO.passengerIdentify=430000000000000000&passengerVO.passengerPhone=13333333333&passengerVO.identifytype=120701
```

返回值
{
"status": "1",      //1成功 别的失败
"passengerid": 1    //代表出行人ID
}

#### 查询出行人接口 queryPassengerInfo
接口地址：
- /user/htuser_queryPassengerInfo.action

返回：
- passengerVO 对象

参数：
- passengerVO.guestId 用户id
- passengerVO.passengerName     姓名
- passengerVO.passengerIdentify 证件号
- passengerVO.passengerPhone    手机号
- passengerVO.identifytype      证件类型  120702 护照  120701 身份证

测试
```
http://www.htyou.com/user/htuser_queryPassengerInfo.action?userid=636773
```

#### 新版提交订单接口（2016-11-21日）

#### 验证优惠券接口
地址：
- /mobile/ourorder_isVaildCoupon.action
ps : 线路必须设置discount 字段
sample: http://www.htyou.com/mobile/tourorder_isVaildCoupon.action?lineid=14036&coupon=D161116314725,D161116314726

参数：
- coupon: 优惠券订单id 从优惠卷接口能获得的字段叫sys_show_order_id，可以同时使用多个，用','逗号分隔
- lineid: 线路ID

返回：
- status:1 正常,104 不可优惠,105 线路不存在,103 优惠卷ID不存在
- sumFraction: 优惠金额共计