function init () {
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	p: 0,	// 指针
	sv: [],		// 原始数据
	c: [0],		// 结果集

	// 生成随机数
	crtV: function () {
		return Math.floor(Math.random() * 37);
	},

	calPercent: function (v) {
		var s = Math.floor(v * 100000) + "%";
		while (s.length < 5) {
			s = "0" + s;
		}
		var n = s.length - 4;
		return s.substring(0, n) + "." + s.substring(n);
	},

	retry: function () {
		for (var i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}
		dat.check();
	},

	// 检查无重复号的间隔频率
	check: function () {
		var i, j, k, v, a = [];
		// var min = dat.sv.length, b = [], bn = 0;	// 间隔信息（没啥号统计的，何种间隔都可能出现无间隔连续）
		for (i = dat.p; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			for (j = (i - 1); j >= dat.p; j --) {
				if (dat.sv[j] === v) {
					k = i - dat.p;
// console.log(i + " , " + j + " , " + k);
					if (dat.c[k]) {
						dat.c[k] ++;
					} else {
						dat.c[k] = 1;
					}
					if (k > 18) {
						dat.c[0] ++;
					}

					// // 间隔统计
					// if (k > 20) {
					// 	b.push({
					// 		"p": dat.p,
					// 		"e": i
					// 	});
					// 	if (bn) {
					// 		bn = dat.p - bn;
					// 		if (bn < min) {
					// 			min = bn;
					// 		}
					// 	}
					// 	bn = i;
					// }

					dat.p = i;
					break;
				}
			}
		}
		console.log(dat.p + " / " + dat.sv.length);
		console.log(dat.c);
		// console.log(min);
		// console.log(dat.sv);
	}
};
