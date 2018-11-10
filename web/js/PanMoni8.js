function init () {
	/*
		测试结果 ： 失败！
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 50,		// 个数
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计

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
		for (i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}
		dat.check(p);
	},

	init: function () {
		for (var i = 0; i < 37; i ++) {
			dat.c[i] = 0;
			dat.s[i] = i;
		}
	},

	add: function (v) {
		dat.c[v] ++;
		for (i = 0; i < 37; i ++) {
			if (dat.s[i] === v) {
				for (j = (i + 1); j < 37; j ++) {
					if (dat.c[dat.s[j]] > dat.c[v]) {
						break;
					} else {
						dat.s[j - 1] = dat.s[j];
						dat.s[j] = v;
					}
				}
				break;
			}
		}
	},

	check: function (i) {
		for (; i < dat.sv.length; i ++) {
			dat.add(dat.sv[i]);
		}
		dat.flush();
	},

	// 输出
	flush: function () {
		var i, r, d, v, n;
		n = dat.sv.length;
		tbDoe.innerHTML = "";
		for (i = 0; i < 37; i ++) {
			v = dat.s[i];
			r = document.createElement("tr");
			d = document.createElement("td");
			d.innerHTML = v;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.c[v];
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = n;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = dat.calPercent(dat.c[v] / n);
			r.appendChild(d);
			tbDoe.appendChild(r);
		}
	}
};
