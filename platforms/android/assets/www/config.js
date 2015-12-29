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
    window.location.href= document.referrer;
}