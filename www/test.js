server_addr = 'http://www.htyou.com';
$.getJSON(server_addr+'/common/adpic_queryAdPic.action?adPicType=220089&datatype=json&jsoncallback=?', function (result, status) {
    for (var i=0; i<result.length; i++){
        //转换搜索区域的链接地址
        //转换搜索关键字的链接地址
        if (result[i].alink.indexOf('tour/type/month/keyword')==0){
            result[i].alink = 'tour-list.html?q='+result[i].alink.substring(result[i].alink.lastIndexOf('/keyword')+8,result[i].alink.lastIndexOf('.'));
        }
        //转换直达链接的链接地址
        if (result[i].alink.indexOf('tour/tourbrowse/')==0){
            result[i].alink = 'mobile_htyou/www/tour-detail.html?lineid='+result[i].alink.substring(result[i].alink.lastIndexOf('/')+1,result[i].alink.lastIndexOf('.'));
        }
        console.log('link'+i+':'+result[i].alink);
    }
    galleryVM.list = result;
});