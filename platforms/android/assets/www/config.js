/**
 * Created by jun4r on 2015/9/18.
 */
var server_addr = 'http://www.htyou.com';

//��ѯurl��������
//���򷵻ز����б�list
//û���򷵻ؿմ�
function getParameters(inUrl/*������URL�ַ���*/){
    //url����?�Ųż���
    if (inUrl.indexOf('\?')>=0){
        return inUrl.substring(inUrl.indexOf('?')+1).split('&');    //���򷵻����в�����list
    }else{
        return '';  //û���򷵻�''
    }
}

//���url��ĳ��������ֵ
//���򷵻ز�����ֵ
//û���򷵻ؿմ�
function getParameterValue(inUrl/*����Url*/, inName/*������*/){
    var paraList = getParameters(inUrl);
    for (var i=0; i<paraList.length; i++){
        //���û��'='������
        if (paraList[i].indexOf('=')<0){
            continue;
        }
        //���������=inName�򷵻ز���ֵ
        var tempVal = paraList[i].split('=');
        if (tempVal[0]==inName){
            return tempVal[1];
        }
    }
    return '';
}
//TEST: getParameterValue('http://www.htyou.com/index.html?q=����&asdf=123&zxcv=123&a=fasdf','q');

//�ײ��ϻ�������Ч
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

//��ת���붯����Ч
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

//���÷�������
function setBack(inSelecter){
    $(inSelecter).attr('href',document.referrer);
}
//ִ�з���
function doBack(){
    window.location.href= document.referrer;
}