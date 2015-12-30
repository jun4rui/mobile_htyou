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
    console.log('[Path log START]')
    var pathLog     = window.localStorage.getItem('PATH_LOG');
    var lastPath    = pathLog.split(',')[pathLog.split(',').length-1];  //最后一条记录的URL
    //如果最后一条记录不是自己，就把自己加到队列末尾
    if (window.location.href != lastPath){
        window.localStorage.setItem( 'PATH_LOG',pathLog+','+window.location.href);
    }
    //后台打印路径记录
    var pathList    =  window.localStorage.getItem('PATH_LOG').split(',');
    //alert(pathList+'\n'+document.referrer+'\n'+window.location.href);
    for (var i in pathList){
        console.log(pathList[i]);
    }
})();