function init () {
	/*
		测试结果 ： 失败！
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	w: 30,		// 周期
	g: 5,		// 连数
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	p: 0,

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
			p = dat.w + dat.g;
		}
		p -= dat.g;
		for (i = 0; i < dat.n; i ++) {
			dat.add([0, dat.crtV()]);
		}
		dat.check(p);
		// dat.flush();
	},

	init: function () {
		nDoe.value = dat.g;
		for (var i = 0; i < 37; i ++) {
			dat.s[i] = i;
			dat.c[i] = [0, i];		// 个数、排名
		}
	},

	add: function (v) {
		var i, p, c;
		p = dat.sv.length;
		if (p >= dat.w) {
			// 判断冷热
			if (dat.c[v[1]][1] < 18) {
				v[0] = 1;	// 热
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

// // 排序测试
// for (i = 0; i < dat.s.length; i ++) {
// 	p = dat.s[i];
// 	console.log(p + " : " + dat.c[p][0] + " , " + dat.c[p][1]);
// }
// p = "";
// for (i = 0; i < dat.sv.length; i ++) {
// 	p += (dat.sv[i][0] + ",");
// }
// console.log(p);
// alert(v);
// console.log("------------");
	},

	check: function (i) {
		var j, k, y = 0, n = 0;
		k = dat.sv.length - (2 * dat.g);
		while (i < k) {
			for (j = 0; j < dat.g; j ++) {
				if (dat.sv[i + j][0] !== dat.sv[i + j + dat.g][0]) {
					break;
				}
			}
			if (j === dat.g) {
				n ++;
			} else {
				j ++;
				y += j;
			}
			i += j;
		}

		dat.flush(y, n);
	},

	// 输出
	flush: function (y, n) {
		var r, d, t = y + n;
		r = document.createElement("tr");
		d = document.createElement("td");
		d.innerHTML = y;
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = n;
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(y / t);
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = dat.calPercent(n / t);
		r.appendChild(d);
		tbDoe.appendChild(r);
	}
};
