function init () {
	/*
		测试结果 ： 失败！
	*/
	document.onkeydown = function (e) {
		if (e.keyCode === 13) {
			dat.ok();
		} else if (e.keyCode === 27) {
			dat.clear();
		} else if (e.keyCode > 47 && e.keyCode < 58) {
			dat.key(e.keyCode - 48);
		}
	};
	lzr_tools.trace();
}

var dat = {
	sv: [],		// 原始数据	[原值, 红黑是否相同, 大小是否相同, 单双是否相同]	相同:1, 不同:-1, 零:0, 其它:-2
	r: [],		// 备选方案
	c: [		// 匹配条件
		[1, -1, -1, -1, -1, -1, 1],
		[1, -1, -1, -1, -1, 1],
		[1, -1, -1, -1, 1, -1, -1, 1],
		[1, -1, -1, -1, 1, -1, 1, -1],
		[1, -1, -1, -1, 1, 1, -1, -1],
		[1, -1, -1, -1, 1, -1, 1, 1],
		[1, -1, -1, -1, 1, 1]

		// [1, -1, -1, -1]
	],
	p: [		// 价格
		[1, 2],
		[1, 6],
		[1, 14],
		[2, 31],
		[4, 67],
		[8, 143],
		[17, 304],
		[36, 645]
	],
	cc: [0, 0, 0, 0],	// 实际使用的策略 ： 模式、路径、剩余次数、指针
	limit: 43,		// 限界

	moni: {
		// 模拟
		// do: 1000,
		do: -1,
		p: 0,

		// 生成随机数
		crtV: function () {
			return Math.floor(Math.random() * 37);
		}
	},

	// 判断红黑
	getR: function (v) {
		var r = dat.getS(v);
		if (v > 10 && v < 29) {
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


	// 获取对应属性
	getP: function (v) {
		var b, r = "-";
		switch (dat.cc[0]) {
			case 1:
				if ((dat.getR(v) * dat.cc[1][dat.cc[3]]) === 1) {
					r = "红";
				} else {
					r = "黑";
				}
				break;
			case 2:
				if ((dat.getM(v) * dat.cc[1][dat.cc[3]]) === 1) {
					r = "大";
				} else {
					r = "小";
				}
				break;
			case 3:
				if ((dat.getS(v) * dat.cc[1][dat.cc[3]]) === 1) {
					r = "单";
				} else {
					r = "双";
				}
				break;
		}
		return r;
	},

	// 取值
	getV: function (v) {
		var p, r = [v];
		if (v) {
			p = dat.sv.length;
			if (p) {
				p = dat.sv[p - 1][0];
			}
			if (p) {
				// 判断红黑是否相同
				if (dat.getR(v) === dat.getR(p)) {
					r.push(1);
				} else {
					r.push(-1);
				}

				// 判断大小是否相同
				if (dat.getM(v) === dat.getM(p)) {
					r.push(1);
				} else {
					r.push(-1);
				}

				// 判断单双是否相同
				if (dat.getS(v) === dat.getS(p)) {
					r.push(1);
				} else {
					r.push(-1);
				}
			} else {
				r.push(-2);
				r.push(-2);
				r.push(-2);
			}
		} else {
			r.push(0);
			r.push(0);
			r.push(0);
		}
		return r;
	},

	// 找路
	find: function (v) {
		var o, p, n, i, j, k;
		p = dat.sv.length - 1;
		n = dat.p.length;
		if (p > n) {
			p -= n;
			for (i = 1; i < 4; i ++) {
				if (v[i] === 1) {
					for (j = 0; j < dat.c.length; j ++) {
						o = true;
						for (k = 0; k < dat.c[j].length; k ++) {
							if (dat.sv[p + k][i] !== dat.c[j][k]) {
								o = false;
								break;
							}
						}
						if (o) {
							// 检查后续路径中没有 0 和 -2
							for (; k <= n; k ++) {
								if (dat.sv[p + k][i] === 0) {
									o = false;
									break;
								}
							}
						}
						if (o) {
							break;
						}
					}
					if (o) {
						// 找到了符合匹配条件的路径
						o = {
							mod: i,			// 模式 。 1:红黑, 2:大小, 3:单双
							tim: dat.sv.length,	// 期数
							v: []			// 路线
						};
						p ++;
						for (j = 0; j < n; j ++) {
							o.v.push(dat.sv[p + j][i] * -1);
						}
						dat.r.push(o);
// console.log (o.mod + "-" + o.tim);
						break;
					}
				}
			}
		}
	},

	// 计算结果
	calr: function (v) {
		if (dat.cc[0]) {
			dat.cc[2] --;
			if (v[dat.cc[0]] === (dat.cc[1][dat.cc[3]] * -1)) {
				// 输
				dat.cc[3] ++;
				if (dat.cc[3] >= dat.cc[1].length) {
					if (dat.moni.do) {
						for (i = 0; i < dat.cc[3]; i ++) {
							dat.moni.p -= dat.p[i][0];
							dat.moni.p -= dat.p[i][1];
						}
					}
					if (!dat.use(v)) {
						dat.cc[0] = 0;
					}
				}
			} else {
				// 赢
				if (dat.moni.do && (v[dat.cc[0]] !== -2)) {
					dat.moni.p += ((dat.cc[3] + 1) * 1);
				}
				if (!dat.use(v)) {
					if (dat.cc[2] > 0) {
						dat.cc[3] = 0;
					} else {
						dat.cc[0] = 0;
					}
				}
			}
		} else {
			dat.use(v);
		}
	},

	// 使用备选方案
	use: function (v) {
		var i, r, n, t;
		if (dat.r.length) {
			if (dat.cc[0]) {
				m = dat.cc[0];
				t = dat.cc[2];
			}
			for (i = dat.r.length - 1; i >= 0; i --) {
				t = dat.r[i];
// console.log(i + " : " + t.mod + "-" + (dat.limit - dat.sv.length + t.tim));
				if ((t.tim + dat.limit) > dat.sv.length) {
// console.log(i + "----- 001");
					if (r) {
// console.log(i + "----- 002");
						if ((t.mod < r.mod) && ((t.tim - n) < 10)) {
// console.log(i + "----- 003");
							r = t;
						}
					} else {
// console.log(i + "----- 004");
						r = t;
						n = t.tim;
						if ((dat.sv.length - n) > (dat.limit / 2)) {
// console.log(i + "----- 005");
							break;
						}
					}
				}
			}
			if (r) {
// console.log("r = " + r.mod + "-" + (dat.limit - dat.sv.length + r.tim));
				dat.r = [];
				t = false;
				if (dat.cc[0]) {
					if (r.mod > dat.cc[0]) {
						if (dat.cc[2] < 10) {
							t = true;
						} else {
// console.log("继续保持 -- " + dat.cc[0] + "-" + dat.cc[2]);
						}
					} else {
						t = true;
					}
				} else {
					t = true;
				}
				if (t) {
// console.log("替换了！");
					dat.cc[0] = r.mod;		// 模式
					dat.cc[1] = r.v;			// 路径
					dat.cc[2] = dat.limit - (dat.sv.length - r.tim);	// 剩余次数
					dat.cc[3] = 0;			// 指针
					return true;
				} else {
					dat.r.push(r);
				}
			}
		}
		return false;
	},

	// 开始
	ok: function () {
		var v = dat.getV(vDoe.innerHTML - 0);	// 取值
		dat.sv.push(v);
		dat.find(v);	// 找路
		dat.calr(v);	// 计算结果

		// 刷新页面
		if (dat.cc[0] && v[0]) {
			pDoe.innerHTML = dat.getP(v[0]) + " : " + dat.p[dat.cc[3]][1] + "<br />" + "零 : " + dat.p[dat.cc[3]][0];
		} else {
			pDoe.innerHTML = "- : -";
		}
		dat.clear();
		if (dat.moni.do) {
			monipDoe.innerHTML = dat.moni.p;
		}

		// 模拟
		if (dat.moni.do) {
			v = dat.moni.crtV();
			if (dat.getR(v) === 1) {
				vDoe.className = "c colrR";
			} else {
				vDoe.className = "c";
			}
			vDoe.innerHTML =  v;
			if (dat.moni.do > 0) {
				// 自动模拟
				dat.moni.do --;
				setTimeout(dat.ok, 1);
			}
		}
	},

	key: function (n) {
		var v = vDoe.innerHTML - 0;
		if ((v * 10 + n) < 37) {
			v = v * 10 + n;
			if (dat.getR(v) === 1) {
				vDoe.className = "c colrR";
			} else {
				vDoe.className = "c";
			}
			vDoe.innerHTML = v;
		}
	},

	// 清空
	clear: function () {
		vDoe.className = "c colrG";
		vDoe.innerHTML = 0;
	}
};
