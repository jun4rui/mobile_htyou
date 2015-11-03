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



"pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg",
 pic/photo/1260698db1f035833b44c07e88c26b58-1.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-2.jpg",
"pic/photo/1260698db1f035833b44c07e88c26b58-3.jpg"





27OCT(TUE) BJSCSX DIRECT ONLY</HEAD>a</HZWZ>7</XH>CA1349</HBH>DS#</DS>FA AA YA BA MA HA KA LA QA GQ SA N3 VQ US TQ EQ M1A V1Q</CW>PEKCSX</HC>1925</CFSJ>2200</DDSJ>32A</JX>0^L</TLCY>E</E>></FH>M1A V1Q</SUBCW>T3 T2 2:35</OTHER>QA</ZDGBYJCW></HB></HBS>

27OCT(TUE) BJSCSX DIRECT ONLY</HEAD>a</HZWZ>7</XH>CA1349</HBH>DS#</DS>FA AA YA BA MA HA KA LA QA GQ SA N3 VQ US TQ EQ M1A V1Q</CW>PEKCSX</HC>1925</CFSJ>2200</DDSJ>32A</JX>0^L</TLCY>E</E>></FH>M1A V1Q</SUBCW>T3 T2 2:35</OTHER>QA</ZDGBYJCW></HB></HBS>






