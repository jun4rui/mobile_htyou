// 配置jquery,requirejs语法
avalon.config({
	paths: {
		wx: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
	}
});

// 20160201 新版微信JS-SDK接口调用
$("document").ready(function() {
	window.setTimeout(function () {
		//alert('3');
		if (whereami() == 'weixin') {
			/*alert('http://www.htyou.com/weixin/getJsConfig.action?page_url='+window.location.href);*/
			require(['wx'], function (wx) {
				//alert('4');
				$.getJSON('http://www.htyou.com/weixin/getJsConfig.action?jsoncallback=?&page_url=' + window.location.href, function (result) {
					//alert(result.timestamp+'\n'+result.appId+'\n'+result.noncestr+'\n'+result.url+'\n'+result.signature);
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: result.appId, // 必填，公众号的唯一标识
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.noncestr, // 必填，生成签名的随机串
						signature: result.signature,// 必填，签名，见附录1
						jsApiList: [
							'checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'onMenuShareQZone',
							'hideMenuItems',
							'showMenuItems',
							'hideAllNonBaseMenuItem',
							'showAllNonBaseMenuItem',
							'translateVoice',
							'startRecord',
							'stopRecord',
							'onVoiceRecordEnd',
							'playVoice',
							'onVoicePlayEnd',
							'pauseVoice',
							'stopVoice',
							'uploadVoice',
							'downloadVoice',
							'chooseImage',
							'previewImage',
							'uploadImage',
							'downloadImage',
							'getNetworkType',
							'openLocation',
							'getLocation',
							'hideOptionMenu',
							'showOptionMenu',
							'closeWindow',
							'scanQRCode',
							'chooseWXPay',
							'openProductSpecificView',
							'addCard',
							'chooseCard',
							'openCard'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.ready(function () {
						var title = '标题';/*$('title').text();*/
						var desc = '描述';/*$('title').text();*/
						var link = window.location.href;
						var imgUrl = $('body img').eq(0).attr('src');

						//分享到朋友圈
						wx.onMenuShareTimeline({
							title: title,
							link: link,
							imgUrl: imgUrl,
							success: function () {
								alert('感谢您的分享');
							},
							cancel: function () {
								alert('欢迎您下次再进行分享');
							}
						});
						//分享给朋友
						wx.onMenuShareAppMessage({
							title: title,	// 分享标题
							desc: desc,		// 分享描述
							link: link,		// 分享链接
							imgUrl: imgUrl,	// 分享图标
							type: 'link',	// 分享类型,music、video或link，不填默认为link
							dataUrl: '',	// 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
								alert('感谢您的分享');
							},
							cancel: function () {
								alert('欢迎您下次再进行分享');
							}
						});
						//分享到QQ
						wx.onMenuShareQQ({
							title: title,	// 分享标题
							desc: desc,		// 分享描述
							link: link,		// 分享链接
							imgUrl: imgUrl,	// 分享图标
							success: function () {
								alert('感谢您的分享');
							},
							cancel: function () {
								alert('欢迎您下次再进行分享');
							}
						});
						//分享到腾讯微博
						wx.onMenuShareWeibo({
							title: title,	// 分享标题
							desc: desc,		// 分享描述
							link: link,		// 分享链接
							imgUrl: imgUrl,	// 分享图标
							success: function () {
								alert('感谢您的分享');
							},
							cancel: function () {
								alert('欢迎您下次再进行分享');
							}
						});
						//分享到QQ空间
						wx.onMenuShareQZone({
							title: title,	// 分享标题
							desc: desc,		// 分享描述
							link: link,		// 分享链接
							imgUrl: imgUrl,	// 分享图标
							success: function () {
								alert('感谢您的分享');
							},
							cancel: function () {
								alert('欢迎您下次再进行分享');
							}
						});
					});
				});
			});
		}
	}, 3000);
});