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
getParameterValue('http://www.htyou.com/index.html?q=����&asdf=123&zxcv=123&a=fasdf','q');