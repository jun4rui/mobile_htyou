$.getJSON('http://www.htyou.com/miaosha/miaosha_queryMiaoShaOrderByGuestId.action?jsoncallback=?&&userid=636773',function(result){
	console.log(result.length);
	result.sort(function(a,b){
		if (a.fraction<b.fraction){
			return 1;
		}else{
			return -1;
		}
	});
	result.map(function(unit){
		console.log(unit.fraction, unit.miaoshaname);
	});
});