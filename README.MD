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



获取新闻的接口DEMO：
http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&infoID=1215


http://www.htyou.com/common/websinfo_queryHTClass.action?datatype=json&classId=722

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

select-date=2015-10-31&chengren-fill=1&ertong-fill=0&tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16

http://www.htyou.com/mobile/tourorder_addTourOrder.action?select-date=2015-10-31&chengren-fill=1&ertong-fill=0&tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16


http://www.htyou.com/mobile/tourorder_addTourOrder.action?tourOrderVO.order_amount=198&tourOrderVO.preferential_price=198&tourOrderVO.pay_type=121604&tourOrderVO.contact_name=test&tourOrderVO.contact_sex=120201&tourOrderVO.contact_phone=13333333333&tourOrderVO.tourproname=石牛寨一日游&tourOrderVO.tourproid=7823&tourOrderVO.jzl_cteamcode=HT-HNS-2151017-00095&tourOrderVO.start_date=2015-10-17&tourOrderVO.adult_num=1&tourOrderVO.child_num=0&tourOrderVO.order_source=16



"pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg",
 pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg"