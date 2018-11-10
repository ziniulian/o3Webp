function init () {
	/*
		测试结果 ： 失败！
		概率依旧很稳定
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	w: 10,		// 最大期数
	sv: [],		// 原始数据
	c: [],		// 检查结果，个数统计

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
			p = dat.w;
		} else {
			p -= 1;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}
		dat.check(p);
	},

	init: function () {
		for (var i = 0; i < dat.w; i ++) {
			dat.c[i] = [0, 0];
		}
	},

	check: function (i) {
		var j, k, v, p, m, n, a = [], b = [];
		k = dat.sv.length - 1;
		for (; i < k; i ++) {
			v = dat.sv[i];
			for (j = 0; j < 37; j ++) {
				a[j] = 0;
			}
			n = 0;
			m = v;
			for ( j = 1; j < dat.w; j++) {
				p = dat.sv[i - j];
				if (v === p) {
					a[m] ++;
					if (a[m] === 1) {
						n ++;
					}
				}
				m = p;
			}
			if (n) {
				dat.c[n][1] ++;
				if (a[dat.sv[i + 1]]) {
					dat.c[n][0] ++;
				}
			}
		}

// console.log(dat.c);

		dat.flush();
	},

	// 输出
	flush: function () {
		var i, r, d, t;
		tbDoe.innerHTML = "";
		for (i = 0; i < dat.w; i ++) {
			r = document.createElement("tr");
			d = document.createElement("td");
			d.innerHTML = i;
			r.appendChild(d);
			d = document.createElement("td");
			if (dat.c[i][1]) {
				t = dat.c[i][0]/dat.c[i][1];
				d.innerHTML = dat.calPercent(t);
			}
			r.appendChild(d);
			tbDoe.appendChild(r);
		}
	}
};
