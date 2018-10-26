function init () {
	/*
		测试结果 ： 失败！
	*/
	document.onkeydown = function (e) {
		if (e.keyCode === 13) {
			dat.run();
		}
	}
	/*
		测试结果 ： 失败！
	*/
	lzr_tools.trace();
}

var dat = {
	sv: [],		// 原始数据
	r: [],		// 备选方案
	c: [		// 策略
		0,
		// [5, 0, 1, 0, 0],
		// [5, 0, 0, 1, 0],
		[30, 0, 0, 1, 0, 0, 0, 0, 0],
	],
	p: [		// 价格
		10,
		30,
		70,
		150,
		310,
		630,
		1270
	],
	cc: [0, 0, 0, 0, 0],	// 实际使用的策略 ： 点数、策略、剩余次数、策略指针、价格指针

	moni: {
		// 模拟
		// do: 5000,
		do: -1,
		p: 0,

		// 生成随机数
		crtV: function () {
			var r = "";
			for (var i = 0; i < 3; i ++) {
				r += (Math.floor(Math.random() * 6) + 1);
			}
			return r;
		}
	},

	// 元素匹配
	match: function (v, p) {
		for (var i = 0; i < v.length; i ++) {
			if (v[i] === p) {
				return 1;
			}
		}
		return 0;
	},

	// 找路
	find: function (p) {
		var i, j, k, b;
		for (i = 1; i < dat.c.length; i ++) {
			if (dat.sv.length > dat.c[i].length) {
				j = dat.sv.length - dat.c[i].length - 1;
				if (dat.match(dat.sv[j], p)) {
					b = true;
					for (k = 1; k < dat.c[i].length; k ++) {
						j ++;
						if (dat.match(dat.sv[j], p) !== dat.c[i][k]) {
							b = false;
							break;
						}
					}
					if (b) {
						return i;
					}
				}
			}
		}
		return 0;
	},

	// 使用备选方案
	use: function () {
		var r, n, t;
		if (dat.r.length) {
			r = dat.r.pop();
			dat.r = [];

			t = dat.c[r[1]][0];
			n = dat.sv.length - r[2];
			if (n < t) {
				dat.cc[0] = r[0];			// 点数
				dat.cc[1] = dat.c[r[1]];	// 策略
				dat.cc[2] = t - n + 1;	// 剩余次数
				dat.cc[3] = 1;		// 策略指针
				dat.cc[4] = 0;		// 价格指针
				return true;
			}
		}
		return false;
	},

	// 开始
	run: function () {
		var n, v, t, i, j;
		n = 3;
		v = [];
		r = [0, 0, dat.sv.length];		// 找路结果
		if (vDoe.innerHTML.length === n) {
			// 取值
			for (i = 0; i < n; i ++) {
				v[i] = vDoe.innerHTML[i] - 0;
			}
			for (i = 0; i < n; i ++) {
				for (j = i + 1; j < n; j ++) {
					if (v[i] > v[j]) {
						t = v[i];
						v[i] = v[j];
						v[j] = t;
					}
				}
			}
			dat.sv.push(v);

			// 找路
			t = dat.find(v[0]);
			if (t) {
				r[0] = v[0];	// 点数
				r[1] = t;		// 策略编号
			}
			for (i = 1; i < n; i ++) {
				if (v[i] !== v[i - 1]) {
					t = dat.find(v[i]);
					if (t) {
						if ((r[1] === 0) || (r[1] && r[1] > t)) {
							r[0] = v[0];
							r[1] = t;
						}
					}
				}
			}
			if (r[1]) {
				// 添加备选方案
				dat.r.push(r);
			}

			// 计算结果
			if (dat.cc[0]) {
				dat.cc[2] --;
				if ((dat.cc[1][dat.cc[3]] === 0) && dat.match(v, dat.cc[0])) {
					// 赢
					if (dat.moni.do) {
						dat.moni.p += ((dat.cc[4] + 1) * 10);
					}
					if (!dat.use()) {
						if (dat.cc[2] > 0) {
							dat.cc[3] = 1;
							dat.cc[4] = 0;
						} else {
							dat.cc[0] = 0;
						}
					}
				} else {
					dat.cc[3] ++;
					if (dat.cc[3] >= dat.cc[1].length) {
						// 输
						if (dat.moni.do) {
							for (i = 0; i <= dat.cc[4]; i ++) {
								dat.moni.p -= dat.p[i];
							}
						}
						if (!dat.use()) {
							dat.cc[0] = 0;
						}
					} else if (dat.cc[1][dat.cc[3]] === 0) {
						dat.cc[4] ++;
					}
				}
			} else {
				dat.use();
			}

			// 刷新页面
			if (dat.cc[0] && (dat.cc[1][dat.cc[3]] === 0)) {
				pDoe.innerHTML = dat.cc[0] + " : " + dat.p[dat.cc[4]];
			} else {
				pDoe.innerHTML = "- : -";
			}
			vDoe.innerHTML = 0;
			if (dat.moni.do) {
				monipDoe.innerHTML = dat.moni.p;
			}

			// 模拟
			if (dat.moni.do) {
				vDoe.innerHTML = dat.moni.crtV();
				if (dat.moni.do > 0) {
					// 自动模拟
					dat.moni.do --;
					setTimeout(dat.run, 1);
				}
			}
		}
	},

	// 保存
	sav: function () {},

	key: function (n) {
		if (vDoe.innerHTML === "0") {
			vDoe.innerHTML = n;
		} else if (vDoe.innerHTML.length < 3) {
			vDoe.innerHTML += n;
		}
	},

	// 清空
	clear: function () {
		vDoe.innerHTML = 0;
	}
};
