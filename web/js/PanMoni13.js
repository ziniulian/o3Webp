function init () {
	/*
		测试结果 ： 失败！无论怎样做前戏，概率始终以命中数的概率为准！
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 100000,	// 个数
	w: 25,		// 冷热周期
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	p: 0,

	dw: 10,	// 周期
	dn: 3,		// 连续数
	dm: 4,		// 命中数

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
		if (p === 0) {
			p = dat.dw;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.add([0, dat.crtV(), 0, 0, 0, 0]);	// 冷热、本值、冷热同、红黑同、大小同、单双同
		}
// console.log(dat.sv);
		dat.check(p);
	},

	init: function () {
		wDoe.value = dat.dw;
		nDoe.value = dat.dn;
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
			k = p - 1;
			while(dat.sv[k][1] === 0) {
				k --;
			}
			k = dat.sv[k];
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
		var j, k, m, n, b, v, p, rc, rm;
		b = [false, true, false, false, false, false];
		rc = [0, 0, 0, 0, 0, 0];		// 匹配数
		rm = [0, 0, 0, 0, 0, 0];		// 命中数
		n = dat.sv.length - dat.dm;

		for (; i < n; i ++) {
// console.log(i);
// console.log(dat.sv[i]);
			b[0] = false;
			b[1] = true;
			b[2] = false;
			b[3] = false;
			b[4] = false;
			b[5] = false;
			for (m = 0; m < 6; m ++) {
// console.log("--- 1 --- : " + m + " , " + b[m]);
				if (b[m] === false) {
					for (j = (dat.dn + dat.dm); j < dat.dw; j ++) {
// console.log("--- 2 --- : " + j);
						for (k = 0; k < dat.dn; k ++) {
							v = dat.sv[i - k][m];
							if (v === 0) {
								b[m] = 0;
								break;
							} else if (v !== dat.sv[i - j - k][m]) {
								break;
							}
						}
						if (k === dat.dn) {
							// 找到匹配内容
							b[m] = true;

							// 判断后边有无无效数据
							for (k = 1; k <= dat.dm; k ++) {
								if (dat.sv[i - j + k][m] === 0) {
									b[m] = false;
									break;
								}
							}

							if (b[m]) {
								// 统计匹配数
								rc[m] ++;
								if (b[1] === true) {
									b[1] = 1;
								}
// console.log(i + " - " + (i - j) + " , " + m);
								// 判断是否命中
								for (k = 1; k <= dat.dm; k ++) {
									v = dat.sv[i + k][m];
									if (v && v !== dat.sv[i - j + k][m]) {
										break;
									}
								}
								if (k > dat.dm) {
									// 被命中
									rm[m] ++;
									b[1] = 2;
// console.log("----- ^^^ -----");
								}
								break;
							}
						}
					}
				}
			}

			if (b[1] !== true) {
				rc[1] ++;	// 综合匹配
				if (b[1] === 2) {
					rm[1] ++;	// 综合命中
				}
			}
		}

// console.log(rc);
// console.log(rm);
		dat.flush(rc, rm);
	},
 
	flush: function (c, m) {
		var i, r, d, n;
		i = c[1];
		c[1] = c[0];
		c[0] = i;
		i = m[1];
		m[1] = m[0];
		m[0] = i;
		for (i = 0; i < 6; i ++) {
			r = document.createElement("tr");
			d = document.createElement("td");
			d.innerHTML = dat.dn;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.dw;
			r.appendChild(d);
			d = document.createElement("td");
			switch(i) {
				case 0:
					d.innerHTML = "综合";
					break;
				case 1:
					d.innerHTML = "冷热";
					break;
				case 2:
					d.innerHTML = "冷热同";
					break;
				case 3:
					d.innerHTML = "红黑同";
					break;
				case 4:
					d.innerHTML = "大小同";
					break;
				case 5:
					d.innerHTML = "单双同";
					break;
			}
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = c[i];
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(c[i] / (dat.n));
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = m[i];
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(m[i] / c[i]);
			r.appendChild(d);
			tbDoe.appendChild(r);
		}
		r = document.createElement("hr");
		tbDoe.appendChild(r);
	},

	clear: function () {
		tbDoe.innerHTML = "";
	}
};
