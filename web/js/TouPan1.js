function init () {
	lzr_tools.trace();
	/*
		测试结果 ： 失败！
	*/

	if (dat.moni.do) {
		for (var i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.moni.crtV());
		}
		dat.flush();
	}
}

var dat = {
	sv: [],		// 原始数据
	n: 25,		// 期数

	moni: {
		// 模拟
		do: 10000,
		// do: 0,
		p: 0,
		v: [],

		// 生成随机数
		crtV: function () {
			return Math.floor(Math.random() * 37);
		}
	},

	setN: function (n) {
		if (n) {
			n = Math.floor(n - 0);
			if ((n > 35) || (n < 10)) {
				dat.n = 0;
				nDoe.value = "";
				// 背景闪烁
			} else {
				dat.n = n;
				nDoe.className = "";
				vDoe.focus();
			}
		}
	},

	setV: function (v) {
		if (v) {
			v = Math.floor(v - 0);
			if ((v > 36) || (v < 0)) {
				// 背景闪烁
			} else {
				dat.sv.push(v);
				vDoe.className = "vDoe";
				vDoe.value = "";
				dat.flush();
			}
		}
	},

	flush: function () {
		var i, j, k, d, b, v;
		k = dat.sv.length;
		if (k > dat.n) {
			v = dat.sv[k - 1];

			// 模拟收益计算
			if (dat.moni.do) {
				if (dat.moni.v.length) {
					b = true;
					for (i = 0; i < dat.moni.v.length; i ++) {
						if (dat.moni.v[i] === v) {
							// 赢
							dat.moni.p += (36 - dat.moni.v.length);
							b = false;
							break;
						}
					}
					if (b) {
						// 输
						dat.moni.p -= dat.moni.v.length;
					}
				}
				monipDoe.innerHTML = dat.moni.p;
				dat.moni.v = [];
			}

			// 正式操作
			k -= dat.n;
			rDoe.innerHTML = "";
			for (i = 0; i < 37; i++) {
				b = true;
				for (j = k; j < dat.sv.length; j ++) {
					if (dat.sv[j] === i) {
						b = false;
						break;
					}
				}
				if (b) {
					d = document.createElement("div");
					d.className = "rDoe";
					d.innerHTML = i;
					rDoe.appendChild(d);
					if (dat.moni.do) {
						dat.moni.v.push(i);
					}
				}
			}
		}

		// 自动模拟
		if (dat.moni.do > 0) {
			dat.sv.push(dat.moni.crtV());
			dat.moni.do --;
			setTimeout(dat.flush, 1);
		}
	},

};
