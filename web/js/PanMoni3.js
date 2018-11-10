function init () {
	/*
		测试结果 : 失败！
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	w: 30,		// 周期
	b: [],		// 标准率
	sv: [],		// 原始数据
	c: [],		// 检查结果
	t1: 2,		// 特殊判断 1 的参数

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
			p = 30;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}

		dat.check(p);
	},

	init: function () {
		var i, j;
		for (i = 1; i < dat.w; i ++) {
			dat.c[i] = [];
			for (j = 0; j < i; j ++) {
				dat.c[i].push([0, 0, 0, 0]);	// 0号元素 : 没命中 , 1号元素 : 命中;
			}
		}
		// 计算标准率
		for (i = 1; i < 37; i ++) {
			dat.b[i] = [
				(i / 36) + 0.0001,	// 正向
				((37 - i) / 36) + 0.0001,	// 反向
			];
		}
// console.log(dat.b);
	},

	check: function (i) {
		var j, p, v, b, m, n, a = [];
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			b = 0;
			n = 0;
			m = 0;
			for (j = 0; j < 37; j ++) {
				a[j] = 0;
			}
			for (j = 1; j < dat.w; j ++) {
				p = dat.sv[i - j];
				if (b === 0 && v === p) {
					b = 1;
				}
				if (a[p]) {
					n ++;
				}
				a[p] ++;
				dat.c[j][n][b] ++;

				// 特殊判断 1 ： 判断是否属于范围内的重复数
				if (a[p] === dat.t1) {
					m ++;
				}
				dat.c[j][m][3] ++;
				if (a[v] >= dat.t1) {
					dat.c[j][m][2] ++;
				}
			}
		}

// console.log(dat.c);

		dat.flush();
	},

	// 基本统计输出 （从结果看，不分期数间隔，完全符合理论比例。没有特殊性，失败！）
	flush: function () {
		var i, j, k, r, d, n, t;
		tbDoe.innerHTML = "";
		for (i = 1; i < dat.w; i ++) {
			for (j = i; j < dat.w; j ++) {
				k = j - i;
				n = dat.c[j][k][0] + dat.c[j][k][1];
				if (n) {
					r = document.createElement("tr");
					d = document.createElement("td");
					d.innerHTML = i;
					r.appendChild(d);
					d = document.createElement("td");
					d.innerHTML = j;
					r.appendChild(d);
					d = document.createElement("td");
					d.innerHTML = dat.c[j][k][1];
					r.appendChild(d);
					d = document.createElement("td");
					d.innerHTML = dat.c[j][k][0];
					r.appendChild(d);
					d = document.createElement("td");
					t = dat.c[j][k][1]/n;
					d.innerHTML = dat.calPercent(t);
					if (t > dat.b[i][0] && n > 10000) {
						d.className = "b";
					}
					r.appendChild(d);
					d = document.createElement("td");
					t = dat.c[j][k][0]/n;
					d.innerHTML = dat.calPercent(t);
					if (t > dat.b[i][1] && n > 10000) {
						d.className = "b";
					}
					r.appendChild(d);
					tbDoe.appendChild(r);
				}
			}

			dat.flush1 (i);
		}
	},

	// 特殊判断 1 的统计显示 （概率依旧固定，依旧没戏）
	flush1: function (i) {
		var j, r, d, f, t;
		for (j = (i + 1); j < dat.w; j ++) {
			if (dat.c[j][i][3]) {
				r = document.createElement("tr");
				d = document.createElement("td");
				d.innerHTML = i;
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = j + "-" + i;
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = dat.c[j][i][2];
				r.appendChild(d);
				d = document.createElement("td");
				f = dat.c[j][i][3] - dat.c[j][i][2];
				d.innerHTML = f;
				r.appendChild(d);
				d = document.createElement("td");
				t = dat.c[j][i][2]/dat.c[j][i][3];
				d.innerHTML = dat.calPercent(t);
				if (t > dat.b[i][0] && dat.c[j][i][3] > 10000) {
					d.className = "b";
				}
				r.appendChild(d);
				d = document.createElement("td");
				t = f/dat.c[j][i][3];
				d.innerHTML = dat.calPercent(t);
				if (t > dat.b[i][1] && dat.c[j][i][3] > 10000) {
					d.className = "b";
				}
				r.appendChild(d);
				tbDoe.appendChild(r);
			}
		}
	}
};
