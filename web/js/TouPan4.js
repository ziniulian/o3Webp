function init () {
	dat.init();
	lzr_tools.trace();
}

var dat = {
	w: 20,		// 冷热周期
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	p: 0,

	dw: 10,	// 周期
	dn: 3,		// 连续数
	dm: 4,		// 命中数

	stu: 0,		// 状态		[指针 , 项目 , 位置]
	pp: [1, 3, 8, 17],
	pb: 19,

	mp: 0,
	mb: 15,

	// 生成随机数
	crtV: function () {
		return Math.floor(Math.random() * 37);
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

	init: function () {
		for (var i = 0; i < 37; i ++) {
			dat.s[i] = i;
			dat.c[i] = [0, i];		// 个数、排名
		}
	},

	setV: function (v) {
		if (v) {
			v = Math.floor(v - 0);
			if ((v > 36) || (v < 0)) {
				// 背景闪烁
			} else {
				dat.add(v);
				vDoe.className = "vDoe";
				vDoe.value = "";
			}
		}
	},

	retry: function () {
		var v = dat.crtV();
		var r = dat.getR(v);
		if (r === 1) {
			r = "红_" + v;
		} else {
			r = "黑_" + v;
		}
// console.log(r);
		dat.add(v);
	},

	add: function (v) {
		var i, p, c, k;
		p = [0, v, 0, 0, 0, 0];	// 冷热、本值、冷热同、红黑同、大小同、单双同
		v = p;
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
			k = dat.sv[dat.p][1];
			c = dat.c[k];
			c[0] --;
			for (i = (c[1] + 1); i < dat.s.length; i ++) {
				if (dat.c[dat.s[i]][0] > c[0]) {
					dat.c[dat.s[i]][1] = i - 1;
					dat.s[i - 1] = dat.s[i];
					dat.s[i] = k;
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

		// 找路
		if (p > (dat.dw)) {
			if (dat.stu) {
// console.log(v);
				// 判断输赢
				if ((v[dat.stu[1]] === 0) || (dat.sv[dat.stu[2] + dat.stu[0]][dat.stu[1]] === v[dat.stu[1]])) {
					dat.stu[0] ++;
					if (dat.stu[0] >= dat.dm) {
// console.log(dat.mp);
						for (i = 0; i < dat.dm; i ++) {
							dat.mp -= dat.pp[i] * dat.pb;
						}
						dat.stu = 0;	// 输
						monipDoe.innerHTML = dat.mp;
					}
				} else {
// console.log(dat.mp);
					dat.mp += (dat.stu[0] + 1) * dat.mb;
					dat.stu = 0;	// 赢
					monipDoe.innerHTML = dat.mp;
				}
			}
			if (dat.stu === 0) {
				dat.find(p);	// 找路
			}
		}

		// 刷新页面
		while (v[dat.stu[1]] === 0) {
			p --;
			v = dat.sv[p];
// console.log(v);
		}
		dat.flush(v);
	},

	find: function (i) {
		var j, k, m, v, p;

		for (m = 5; m > 1; m --) {
		// for (m = 2; m < 6; m ++) {
			for (j = (dat.dn + dat.dm); j < dat.dw; j ++) {
				p = i - j;
				for (k = 0; k < dat.dn; k ++) {
					v = dat.sv[i - k][m];
					if ((v===0) || (v !== dat.sv[p - k][m])) {
						break;
					}
				}
				if (k === dat.dn) {
					for (k = 1; k <= dat.dm; k ++) {
						if (dat.sv[p + k][m] === 0) {
							break;
						}
					}

					if (k > dat.dm) {
						dat.stu = [0, m, p + 1];
						break;
					}
				}
			}
			if (dat.stu) {
// console.log(dat.stu);
// console.log(dat.sv);
				break;
			}
		}
	},
 
	flush: function (v) {
		var p, b, d;
		pDoe.innerHTML = 0;
		rDoe.innerHTML = "";
		if (dat.stu) {
			p = dat.sv[dat.stu[2] + dat.stu[0]];
			b = p[dat.stu[1]] * -1;
			if (dat.stu[1] === 2) {
				pDoe.innerHTML = dat.pp[dat.stu[0]];
				b *= v[0];
				var i, n;
				if (b === 1) {
					i = 0;
					n = 18;
				} else {
					i = 18;
					n = 37;
				}
				for (; i < n; i ++) {
					d = document.createElement("div");
					d.className = "rDoe";
					d.innerHTML = dat.s[i];
					rDoe.appendChild(d);
				}
			} else {
				pDoe.innerHTML = dat.pp[dat.stu[0]] * dat.pb;
				switch (dat.stu[1]) {
					case 3:
						d = document.createElement("div");
						d.className = "rDoe";
						b *= dat.getR(v[1]);
						if (b === 1) {
							d.innerHTML = "红";
						} else {
							d.innerHTML = "黑";
						}
						rDoe.appendChild(d);
						break;
					case 4:
						d = document.createElement("div");
						d.className = "rDoe";
						b *= dat.getM(v[1]);
						if (b === 1) {
							d.innerHTML = "大";
						} else {
							d.innerHTML = "小";
						}
						rDoe.appendChild(d);
						break;
					case 5:
						d = document.createElement("div");
						d.className = "rDoe";
						b *= dat.getS(v[1]);
						if (b === 1) {
							d.innerHTML = "单";
						} else {
							d.innerHTML = "双";
						}
						rDoe.appendChild(d);
						break;
				}
			}
		}
	}
};
