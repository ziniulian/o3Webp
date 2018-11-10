function init () {
	/*
		测试结果 ： 失败！
		概率依旧稳定
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	tw: 85,		// 投注周期
	cw: 617,		// 统计周期
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	r: [],		// 结果统计
	b: [],		// 标准率

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
		var i, p = dat.sv.length;
		if (p === 0) {
			p = dat.cw;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}
		while (p) {
			p = dat.check(p);
		}
		dat.flush();
	},

	init: function () {
		for (var i = 0; i < 37; i ++) {
			dat.s[i] = i;
			dat.r[i] = [0, 0, 0];

			// 计算标准率
			dat.b[i] = [
				(i / 36) + 0.0001,	// 正向
				((37 - i) / 36) + 0.0001,	// 反向
			];
		}
	},

	add: function (v) {
		dat.c[v] ++;
		for (i = 0; i < 37; i ++) {
			if (dat.s[i] === v) {
				// for (j = (i - 1); j >= 0; j --) {		// 热
				for (j = (i + 1); j < 37; j ++) {		// 冷
					if (dat.c[dat.s[j]] > dat.c[v]) {
						break;
					} else {
						// dat.s[j + 1] = dat.s[j];		// 热
						dat.s[j - 1] = dat.s[j];		// 冷
						dat.s[j] = v;
					}
				}
				break;
			}
		}
	},

	check: function (i) {
		var j, k, v, b;
		for (j = 0; j < 37; j ++) {
			dat.c[j] = 0;
		}
		for (j = dat.cw; j > 0; j --) {
			dat.add(dat.sv[i - j]);
		}
		for (j = 0; j < dat.tw; j ++) {
			v = dat.sv[i];
			dat.r[0][0] ++;
			b = false;
			for (k = 0; k < 35; k ++) {
				if (dat.s[k] === v) {
					b = true;
				}
				if (b) {
					dat.r[k + 1][0] ++;
					if (dat.r[k + 1][1] > dat.r[k + 1][2]) {
						dat.r[k + 1][2] = dat.r[k + 1][1];
					}
					dat.r[k + 1][1] = 0;
				} else {
					dat.r[k + 1][1] ++;
				}
			}
			i ++;
			if (i >= dat.sv.length) {
				return 0;
			} else {
				// dat.add(v);
			}
		}
		return i;
	},

	// 输出
	flush: function () {
		var i, r, d, v, n;
		n = dat.sv.length;
		tbDoe.innerHTML = "";
		for (i = 1; i < 36; i ++) {
			r = document.createElement("tr");
			d = document.createElement("td");
			d.innerHTML = i;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.r[i][2];
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(dat.r[i][0] / dat.r[0][0]);
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(dat.b[i][0]);
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent((dat.r[0][0] - dat.r[i][0]) / dat.r[0][0]);
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(dat.b[i][1]);
			r.appendChild(d);
			tbDoe.appendChild(r);
		}
	}
};
