function init () {
	lzr_tools.trace();
	/*
		测试结果 ： 失败！
		改良后，结果依旧失败
	*/
}

var dat = {
	sv: [],		// 原始数据
	c: [],		// 备选数字
	n: 17,		// 期数
	win: 0,
	low: 0,

	moni: {
		// 模拟
		do: 0,
		p: 0,

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
				dat.calc();
			}
		}
	},

	calc: function () {
		var i, j, n, v;
		n = dat.sv.length;
		if (n >= dat.n) {
			v = dat.sv[n - 1];
// alert(v);
			// 模拟收益计算
			if (dat.moni.do) {
				if (dat.c[v] === 1) {
					// 赢
					dat.moni.p += (dat.n - 1);
					dat.win ++;
				} else if (dat.c[v] === -1) {
					// 输
					dat.moni.p -= (37 - dat.n);
					dat.low ++;
				}
			}

			// 正式操作
			for (i = 0; i < 37; i ++) {
				dat.c[i] = 1;
			}

			for (i = (n - dat.n); i < n; i ++) {
				if (dat.c[dat.sv[i]] === 1) {
					dat.c[dat.sv[i]] = -1;
				} else {
					for (j = 0; j < 37; j ++) {
						dat.c[j] = 0;
					}
					break;
				}
			}
			// dat.flush();
		}

		// 自动模拟
		if (dat.moni.do > 0) {
			dat.sv.push(dat.moni.crtV());
			dat.moni.do --;
			// setTimeout(dat.calc, 1);
			dat.calc();
		} else {
			console.log (dat.win + " / " + dat.low + " / " + dat.sv.length + " (" + dat.calPercent((dat.win)/dat.sv.length) + ") , " + dat.moni.p + " | " + (dat.win * (dat.n - 1) - dat.low * (37 - dat.n)) + " ... " + (dat.low * (36 - dat.n) - dat.win * dat.n));
		}
	},

	calPercent: function (v) {
		var s = Math.floor(v * 100000) + "%";
		while (s.length < 5) {
			s = "0" + s;
		}
		var n = s.length - 4;
		return s.substring(0, n) + "." + s.substring(n);
	},

	flush: function () {
		var i, d;
		rDoe.innerHTML = "";
		if (dat.c[0]) {
			for (i = 0; i < 37; i ++) {
				if (dat.c[i] === 1) {
					d = document.createElement("div");
					d.className = "rDoe";
					d.innerHTML = i;
					rDoe.appendChild(d);
				}
			}
		}
		if (dat.moni.do) {
			monipDoe.innerHTML = dat.moni.p;
		}
	},

	retry: function () {
		dat.moni.do = 6000;
		dat.sv.push(dat.moni.crtV());
		dat.calc();
	}

};
