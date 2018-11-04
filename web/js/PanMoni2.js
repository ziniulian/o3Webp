function init () {
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	p: 0,	// 指针
	sv: [],		// 原始数据
	bu: 12,		// 补刀位置
	c: [[[], []]],		// 结果集

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
		for (i = dat.p; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			for (j = (i - 1); j >= dat.p; j --) {
				if (dat.sv[j] === v) {
					k = i - dat.p;
					if (dat.c[k]) {
						dat.c[k] ++;
					} else {
						dat.c[k] = 1;
					}

					// 二次补刀策略统计
					if (k === dat.bu) {
						v = dat.sv[i + 1];
						for (j = (j - 1); j >= dat.p; j --) {
							if (dat.sv[j] === v) {
								dat.c[0][1].push(i);
								break;
							}
						}
						if (j < dat.p) {
							dat.c[0][0].push(i);
						}
					}

					dat.p = i;
					break;
				}
			}
		}

		dat.check1();
	},

	// 统计各关口的赢输比例
	check1: function () {
		var i, j, v, t, r, d;
		tbDoe.innerHTML = "";
		for (i = 1; i < dat.c.length; i ++) {
			t = 0;
			v = dat.c[i];
			if (v) {
				for (j = (i + 1); j < dat.c.length; j ++) {
					if (dat.c[j]) {
						t += dat.c[j];
					}
				}

				// 页面更新
				r = document.createElement("tr");
				d = document.createElement("td");
				d.innerHTML = i;
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = v;		// 保关次数
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = t;		// 破关次数
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = dat.calPercent(v/(v + t));	// 保破比例
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = (v * (36 - i)) - (t * i);		// 投保式盈利
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = (t * (i - 1)) - (v * (37 - i));	// 投破式盈利
				r.appendChild(d);
				tbDoe.appendChild(r);
			}
		}

		vDoe.innerHTML = "补刀信息 ： " + dat.bu + " - " + dat.calPercent(dat.c[0][1].length/dat.c[0][0].length) + " , " + dat.sv.length;

		// console.log (dat.sv);
		// console.log(dat.c[0]);
	}
};
