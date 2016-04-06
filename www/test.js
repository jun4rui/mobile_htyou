(function (window) {
	function computeComplex(password) {
		var complex = 0;
		var length  = password.length;

		var pre     = '';
		var preType = 0;
		for (var i = 0; i < length; i++) {
			var cur     = password.charAt(i);
			var curType = gettype(password, i);

			if (preType != curType || !isregular(cur, pre, curType)) {
				complex += curType + getcomplex(curType, preType);
			}

			pre     = cur;
			preType = curType;
		}

		return complex;
	}

	function gettype(str, i) {
		if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
			return 1;
		}
		else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
			return 2;
		}
		else if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
			return 3;
		}

		return 4;
	}

	function isregular(cur, pre, type) {
		var curCode = cur.charCodeAt(0);
		var preCode = pre.charCodeAt(0);

		if (curCode - preCode == 0) {
			return true;
		}

		if (type != 4 && (curCode - preCode == 1 || curCode - preCode == -1)) {
			return true;
		}

		return false;
	}

	function getcomplex(curType, preType) {
		if (preType == 0 || curType == preType) {
			return 0;
		} else if (curType == 4 || preType == 4) {
			return 2;
		} else {
			return 1;
		}
	}

	return window.computeComplex = computeComplex;
})(window)

computeComplex('caojun');