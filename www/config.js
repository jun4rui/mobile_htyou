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
//    http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&infoID=431
//获取，返回值为json格式，销售人员返回值中必须是"info_class": 421
(function(){
	var infoID  = getParameterValue(window.location.href,'infoid');

	//展现销售人员UI的函数
	function showSellerUI(){
		var infoData= '';
		//读取localStorage中的INFO_DATA数据
		if ((infoData = window.localStorage.getItem('INFO_DATA'))!=null){
            console.log(infoData);
			$('#seller').ready(function(){
				//设置客服参数
                $('#seller .face').css({'background':'url('+infoData.split(',')[2]+') 50% 0% no-repeat'});
                $('#seller .content strong').text(infoData.split(',')[0]);
                $('#seller .content a').attr('href','tel:'+infoData.split(',')[1]);
				//弹出UI
				$('#seller').animate({'left':'1rem','bottom:':'1rem'});
			});
		}
	}

	//处理流程
	if (infoID!=''){
		$.getJSON('http://www.htyou.com/common/websinfo_queryWebsInfos.action?submit=ajax&jsoncallback=?&infoID='+infoID,function(result){
			//是否找到销售人员
			if (result.length!=0){
				//判断是否是销售人员类型
				if (result[0].info_class=='421'){
					console.log(result[0]);
					//保存到localStorage中的INFO_DATA中
					window.localStorage.setItem('INFO_DATA',''+result[0].info_name+','+result[0].description+','+'http://www.htyou.com/'+result[0].info_thumbpic);
				}
			}
			//然后在当前页面加入销售人员UI效果
			showSellerUI();
		});
	}else{
		//没有则直接展示销售UI(localStorage中有数据才会展示)
		showSellerUI();
	}
})(window);