/**
 * Created by jun4r on 2015/9/18.
 */
var server_addr = 'http://www.htyou.com';

//查询url参数函数
//有则返回参数列表list
//没有则返回空串
function getParameters(inUrl/*完整的URL字符串*/){
	//url中有?号才继续
	if (inUrl.indexOf('\?')>=0){
		return inUrl.substring(inUrl.indexOf('?')+1).split('&');    //有则返回所有参数的list
	}else{
		return '';  //没有则返回''
	}
}

//获得url中某个参数的值
//有则返回参数的值
//没有则返回空串
function getParameterValue(inUrl/*输入Url*/, inName/*参数名*/){
	var paraList = getParameters(inUrl);
	for (var i=0; i<paraList.length; i++){
		//如果没有'='则跳过
		if (paraList[i].indexOf('=')<0){
			continue;
		}
		//如果参数名=inName则返回参数值
		var tempVal = paraList[i].split('=');
		if (tempVal[0]==inName){
			return tempVal[1];
		}
	}
	return '';
}
//TEST: getParameterValue('http://www.htyou.com/index.html?q=北京&asdf=123&zxcv=123&a=fasdf','q');

//底部上划载入特效
function slide(hrf){
	var options = {
		"href"           : hrf,
		"direction"      : "up", // 'left|right|up|down', default 'left' (which is like 'next')
		"duration"       :  1000, // in milliseconds (ms), default 400
		"slowdownfactor" :    4, // overlap views (higher number is more) or no overlap (1), default 3
		"iosdelay"       :  100, // ms to wait for the iOS webview to update before animation kicks in, default 50
		"androiddelay"   :  50  // same as above but for Android, default 50
	};
	window.plugins.nativepagetransitions.slide(
		options,
		function (msg) {console.log("success: "+msg)}, // called when the animation has finished
		function (msg) {alert("error: "+msg)} // called in case you pass in weird values
	);
}

//翻转载入动画特效
function flip(href) {
	window.plugins.nativepagetransitions.flip({
		'duration': 1000,
		'direction': 'right',
		'iosdelay': 100,
		'androiddelay': 50,
		'winphonedelay': 800,
		'href': href
	});
}

//设置返回链接
function setBack(inSelecter){
	$(inSelecter).attr('href',document.referrer);
}
//执行返回
function doBack(){
	/*window.location.href= document.referrer;*/
	var pathLog     = window.localStorage.getItem('PATH_LOG');
	var lastPath    = pathLog.split(',')[pathLog.split(',').length-1];  //最后一条记录的URL
	//如果当前页面在队列末尾，则删除当前页
	if (lastPath==window.location.href){
		window.localStorage.setItem('PATH_LOG',pathLog.substring(0,pathLog.lastIndexOf(',')));
		lastPath    = window.localStorage.getItem('PATH_LOG').split(',')[window.localStorage.getItem('PATH_LOG').split(',').length-1];
	}
	window.location.href = lastPath;
}

//需要JQuery，匿名自执行函数，用来控制历史纪录
(function(){
	//到首页后将清空路径记录（考虑首页没有回退，而且首页作为起点）
	if (window.location.href.indexOf('main.html')!=-1){
		window.localStorage.setItem('PATH_LOG','');
	}
	//如果没有PATH_LOG则初始化
	if ( window.localStorage.getItem('PATH_LOG')==null){
		window.localStorage.setItem('PATH_LOG','');
	}
	//console.log('[Path log START]')
	var pathLog     = window.localStorage.getItem('PATH_LOG');
	var lastPath    = pathLog.split(',')[pathLog.split(',').length-1];  //最后一条记录的URL
	//如果最后一条记录不是自己，就把自己加到队列末尾
	if (window.location.href != lastPath){
		window.localStorage.setItem( 'PATH_LOG',pathLog+','+window.location.href);
	}
	//后台打印路径记录
	/*var pathList    =  window.localStorage.getItem('PATH_LOG').split(',');
	//alert(pathList+'\n'+document.referrer+'\n'+window.location.href);
	for (var i in pathList){
		console.log(pathList[i]);
	}*/
})();



//Caojun 20160108 新增:销售人员信息读取函数
//销售人员根据url中infoid=???参数进行识别,???代表销售人员的ID编号，通过接口
//http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&infoID=431
//http://www.htyou.com/common/websinfo_queryWebsInfos.action?url=oiZKXjjxNP3iA6iUfgkVo6H7sdmU&submit=ajax
//获取，返回值为json格式，销售人员返回值中必须是"info_class": 421
//INFO_DATA格式：姓名,电话,头像url,存储时间
//TODO: 20160112 首页还是改成原来的大头像方式；二级页面照旧；产品详情页面改成底部分成两栏模式，左边是头像和电话，右边是预定
(function(){
	var infoID  = getParameterValue(window.location.href,'infoid');
	var userID  = getParameterValue(window.location.href,'url');

	//展现销售人员UI的函数
	function showSellerUI(){
		var infoData= '';
		//读取localStorage中的INFO_DATA数据
		if ((infoData = window.localStorage.getItem('INFO_DATA'))!=null){
			//console.log(infoData);
			//如果保存时间太久超过24小时则摧毁INFO_DATA，否则显示销售员信息
			if(((new Date).getTime()-infoData.split(',')[4])>86400000){
				//console.log((new Date).getTime()-parseInt(infoData.split(',')[3]));
				window.localStorage.removeItem('INFO_DATA');
			}else{
				$(document).ready(function(){
					//线路详情页面的处理方式
					if (window.location.href.indexOf('tour-detail.html')>-1){
						$('#btn-style-2 a').attr('href','tel:'+infoData.split(',')[1]);
						$('#btn-style-1').hide();
						$('#btn-style-2').show();
						return true;
					}
					//首页的处理方式
					if (window.location.href.indexOf('main.html')>-1){
						$('#seller-panel').height(parseInt($(window).width()/110*44));
						$('#seller-panel .seller-panel-bg').css({'background':'url('+infoData.split(',')[2]+') 50% 50% no-repeat','background-size':'cover'});
						$('#seller-panel img').attr({'src':''+infoData.split(',')[2]});
						$('#seller-panel a').attr({'href':'tel:'+infoData.split(',')[1]});
						$('#seller-panel a span').text(infoData.split(',')[0]);
						$('#galleryAD').hide();
						$('#seller-panel').show();
						return true;
					}
					//一般的处理方式
					$('body').append('<div id="seller-section"></div>');
					$('#seller-section').load('seller.html',function(){
						$('#seller .face').css({'background':'url('+infoData.split(',')[2]+') 50% 0% no-repeat'});
						$('#seller .content strong').text(infoData.split(',')[0]);
						$('#seller .content a').attr('href','tel:'+infoData.split(',')[1]);
						$('#seller').animate({'left':'1rem','bottom:':'1rem'});
					});
				});
			}
		}
	}

	//有infoID或者userID的处理流程，因为是ajax异步处理数据，所以两种情况作单独处理
	if (infoID != '' || userID != '') {
		//用infoID的情况
		if (infoID != '') {
			$.getJSON('http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&jsoncallback=?&infoID=' + infoID, function (result) {
				//是否找到销售人员
				if (result.length != 0) {
					//判断是否是销售人员类型
					if (result[0].info_class == '421') {
						console.log(result[0]);
						//保存到localStorage中的INFO_DATA中
						window.localStorage.setItem('INFO_DATA', '' + result[0].info_name + ',' + result[0].description + ',' + 'http://www.htyou.com/' + result[0].info_thumbpic+','+result[0].info_id+','+(new Date).getTime());
					}
				}
				//然后在当前页面加入销售人员UI效果
				showSellerUI();
			});
		}
		//用userID的情况
		if (userID != '') {
			$.getJSON('http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&jsoncallback=?&url=' + userID, function (result) {
				//是否找到销售人员
				if (result.length != 0) {
					//判断是否是销售人员类型
					if (result[0].info_class == '421') {
						console.log(result[0]);
						//保存到localStorage中的INFO_DATA中
						window.localStorage.setItem('INFO_DATA', '' + result[0].info_name + ',' + result[0].description + ',' + 'http://www.htyou.com/' + result[0].info_thumbpic+','+result[0].info_id+','+(new Date).getTime());
					}
				}
				//然后在当前页面加入销售人员UI效果
				showSellerUI();
			});
		}

	}else{
		//没有则直接展示销售UI(localStorage中有数据才会展示)
		showSellerUI();
	}
})(window);




//分享至weixin的函数
function _WXShare(img, width, height, title, desc, url, appid) {
	// 获得info_id(华天旅游网微新版专用)
	var infoID		= '';
	var INFO_DATA	= window.localStorage.getItem('INFO_DATA');
	var otherUrl	= document.location.href;
	if (INFO_DATA!=null){
		if (INFO_DATA.split(',').length==5){
			infoID	= INFO_DATA.split(',')[3];
			//url有参数的处理方式
			if (otherUrl.indexOf('?')>-1){
				otherUrl 	= otherUrl+'&infoID='+infoID;
			}else{
				//url没参数的处理方式
				otherUrl 	= otherUrl+'?infoID='+infoID;
			}
		}
	}
	//console.log(infoID,INFO_DATA);

	//初始化参数
	img = img || 'http://www.htyou.com/images/v4/header_logo1.png';
	width = width || 100;
	height = height || 100;
	title = title || document.title;
	desc = desc || document.title;
	//url = url || document.location.href;
	url = url || otherUrl;
	appid = appid || '';
	//微信内置方法
	function _ShareFriend() {
		WeixinJSBridge.invoke('sendAppMessage', {
				'appid': appid,
				'img_url': img,
				'img_width': width,
				'img_height': height,
				'link': url,
				'desc': desc,
				'title': title
			},
			function (res) {
				_report('send_msg', res.err_msg);
			}
		)
	}

	function _ShareTL() {
		WeixinJSBridge.invoke('shareTimeline', {
				'img_url': img,
				'img_width': width,
				'img_height': height,
				'link': url,
				'desc': desc,
				'title': title
			}
			,
			function (res) {
				_report('timeline', res.err_msg);
			}
		);
	}

	function _ShareWB() {
		WeixinJSBridge.invoke('shareWeibo', {
				'content': desc,
				'url': url,
			}
			,
			function (res) {
				_report('weibo', res.err_msg);
			}
		);
	}

	// 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 发送给好友
		WeixinJSBridge.on('menu:share:appmessage', function (argv) {
			_ShareFriend();
		});

		// 分享到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function (argv) {
			_ShareTL();
		});

		// 分享到微博
		WeixinJSBridge.on('menu:share:weibo', function (argv) {
			_ShareWB();
		});
	}, false);
}

//页面载入后算出分享信息
//TODO:20160112 一些页面第一张图片可能是按钮，并且title有些只有“华天旅游网”5个字
$("document").ready(function(){
	//设定5s后设定分享数据
	window.setInterval(function(){
		//线路详情使用的分享模式
		if (window.location.href.indexOf('tour-detail.html')>-1){
			_WXShare($('#galleryAD img').eq(0).attr('src'),'640','480',$('.info-section h3').text(),'','');
			return true;
		}
		//机票查询页面
		if (window.location.href.indexOf('ticket-index.html')>-1){
			_WXShare($('#galleryAD img').eq(0).attr('src'),'640','480','机票查询','','');
			return true;
		}
		//机票查询结果页面
		if (window.location.href.indexOf('ticket-index.html')>-1){
			_WXShare('http://www.htyou.com/weixin_h5/images/ticket_index_title_bg.jpg','640','480','机票查询: 从'+decodeURI(getParameterValue(window.location.href,'fromCity'))+'到'+decodeURI(getParameterValue(window.location.href,'toCity')),'','');
			return true;
		}
		//线路列表页面
		if (window.location.href.indexOf('tour-list.html')>-1){
			_WXShare($('#tourlist-section-list img').eq(0).attr('src'),'640','480','景点列表:'+decodeURI(getParameterValue(window.location.href,'q')),'','');
			return true;
		}
		//区域列表页面
		if (window.location.href.indexOf('tour-area.html')>-1){
			_WXShare($('.am-gallery-item img').eq(0).attr('src'),'640','480',$('.am-header-title').text(),'','');
			return true;
		}
		//一般情况下用标准的分享模式
		_WXShare($('body img').eq(0).attr('src'),'640','480',$('title').text(),$('title').text(),'','');

	},5000);
});


//判断页面处于何种浏览器框架下
//包括:weixin,cordova,browser
function whereami(){
	var userAgent   = navigator.userAgent.toLowerCase();
	//微信
	if (userAgent.match(/micromessenger/i)=='micromessenger')
		return 'weixin';
	//Cordova
	if (userAgent.match(/Crosswalk/i)=='crosswalk')
		return 'cordova';
	return 'other'
}
//alert(navigator.userAgent);
