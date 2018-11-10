function init () {
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	w: 30,		// 周期
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	p: 0,
	r: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],		// 热、冷、冷热同、冷热反、红黑同、红黑反、大小同、大小反、单双同、单双反

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

	// 判断红黑
	getR: function (v) {
		var r = dat.getS(v);
		if ((v > 10 && v < 19) || (v > 28)) {
			r *= -1;
		}
		return r;
	},

	// 判断大小
	getM: function (v) {
		if (v < 19) {
			return -1;	// 小
		} else {
			return 1;	// 大
		}
	},

	// 判断单双
	getS: function (v) {
		if (v % 2) {
			return 1;	// 单
		} else {
			return -1;	// 双
		}
	},

	retry: function () {
		var i, p = dat.sv.length;
		for (i = 0; i < dat.n; i ++) {
			dat.add([0, dat.crtV(), 0, 0, 0, 0]);	// 冷热、本值、冷热同、红黑同、大小同、单双同
		}
// console.log(dat.sv);
		dat.check(p);
	},

	init: function () {
		for (var i = 0; i < 37; i ++) {
			dat.s[i] = i;
			dat.c[i] = [0, i];		// 个数、排名
		}
	},

	add: function (v) {
		var i, p, c, k;
		p = dat.sv.length;

		// 判断属性
		if (p) {
			k = dat.sv[p - 1];
			if (v[1]) {
				if (k[1]) {
					if (dat.getR(k[1]) === dat.getR(v[1])) {
						v[3] = 1;	// 红黑相同
					} else {
						v[3] = -1;	// 红黑不同
					}
					if (dat.getM(k[1]) === dat.getM(v[1])) {
						v[4] = 1;	// 大小相同
					} else {
						v[4] = -1;	// 大小不同
					}
					if (dat.getS(k[1]) === dat.getS(v[1])) {
						v[5] = 1;	// 单双相同
					} else {
						v[5] = -1;	// 单双不同
					}
				}
			}
		}

		// 判断冷热
		if (p >= dat.w) {
			if (dat.c[v[1]][1] < 18) {
				v[0] = 1;	// 热
			} else {
				v[0] = -1;	// 冷
			}
			if (v[0] === k[0]) {
				v[2] = 1;	// 冷热相同
			} else {
				v[2] = -1;	// 冷热不同
			}

			// 减一个号
			p = dat.sv[dat.p][1];
			c = dat.c[p];
			c[0] --;
			for (i = (c[1] + 1); i < dat.s.length; i ++) {
				if (dat.c[dat.s[i]][0] > c[0]) {
					dat.c[dat.s[i]][1] = i - 1;
					dat.s[i - 1] = dat.s[i];
					dat.s[i] = p;
					c[1] = i;
				} else {
					break;
				}
			}
			dat.p ++;
		}

		// 加一个号
		c = dat.c[v[1]];
		c[0] ++;
		for (i = (c[1] - 1); i >= 0; i --) {
			if (dat.c[dat.s[i]][0] > c[0]) {
				break;
			} else {
				dat.c[dat.s[i]][1] = i + 1;
				dat.s[i + 1] = dat.s[i];
				dat.s[i] = v[1];
				c[1] = i;
			}
		}
		dat.sv.push(v);
	},

	check: function (i) {
		var v;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[3] === 1) {
				dat.r[4] ++;	// 红黑相同
			} else if (v[3] === -1) {
				dat.r[5] ++;	// 红黑不同
			}
			if (v[4] === 1) {
				dat.r[6] ++;	// 大小相同
			} else if (v[4] === -1) {
				dat.r[7] ++;	// 大小不同
			}
			if (v[5] === 1) {
				dat.r[8] ++;	// 单双相同
			} else if (v[5] === -1) {
				dat.r[9] ++;	// 单双不同
			}
			if (i >= dat.w) {
				if (v[0] === 1) {
					dat.r[0] ++;	// 热
				} else {
					dat.r[1] ++;	// 冷
				}
				if (v[2] === 1) {
					dat.r[2] ++;	// 冷热相同
				} else {
					dat.r[3] ++;	// 冷热不同
				}
			}
		}

		dat.flush();
	},

	// 输出
	flush: function () {
		var r, d, n;
		tbDoe.innerHTML = "";

		n = dat.r[0] + dat.r[1];
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = "冷热";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[0] + "（热）";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[1] + "（冷）";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[0] / n);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[1] / n);
		r.appendChild(d);
		tbDoe.appendChild(r);

		n = dat.r[2] + dat.r[3];
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = "冷热";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[2];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[3];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[2] / n);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[3] / n);
		r.appendChild(d);
		tbDoe.appendChild(r);

		n = dat.r[4] + dat.r[5];
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = "红黑";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[4];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[5];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[4] / n);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[5] / n);
		r.appendChild(d);
		tbDoe.appendChild(r);

		n = dat.r[6] + dat.r[7];
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = "大小";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[6];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[7];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[6] / n);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[7] / n);
		r.appendChild(d);
		tbDoe.appendChild(r);

		n = dat.r[6] + dat.r[7];
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = "单双";
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[6];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.r[7];
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[6] / n);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(dat.r[7] / n);
		r.appendChild(d);
		tbDoe.appendChild(r);
	}
};
