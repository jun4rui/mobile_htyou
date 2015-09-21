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
getParameterValue('http://www.htyou.com/index.html?q=北京&asdf=123&zxcv=123&a=fasdf','q');