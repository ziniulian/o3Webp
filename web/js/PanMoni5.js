function init () {
	/*
		测试结果 ： 失败！
		证明了，无论何种间距，概率始终稳定不变
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	d: 1,		// 两号间的相隔数
	sv: [],		// 原始数据
	c: [],		// 检查结果

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
			p = dat.d;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.sv.push(dat.crtV());
		}
		dat.check(p);
	},

	init: function () {
		nDoe.value = dat.d;
		for (var i = 0; i < 37; i ++) {
			dat.c[i] = [0];
		}
	},

	check: function (i) {
		var j, k, v;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (dat.sv[i - dat.d] === v) {
				dat.c[v][0] ++;
				for ( j = (i + 1); j < dat.sv.length; j++) {
					k = j - i;
					if (!dat.c[v][k]) {
						dat.c[v][k] = [0, 0];
					}
					dat.c[v][k][1] ++;
					if (dat.sv[j] === v) {
						dat.c[v][k][0] ++;	// 命中
						break;
					}
				}
			}
		}

console.log(dat.c);

		dat.flush();
	},

	// 输出
	flush: function () {
		var i, j, r, d, t;
		tbDoe.innerHTML = "";
		for (i = 0; i < 37; i ++) {
			for (j = 1; j < 38; j ++) {
				r = document.createElement("tr");
				d = document.createElement("td");
				d.innerHTML = i;
				r.appendChild(d);
				d = document.createElement("td");
				d.innerHTML = j;
				r.appendChild(d);
				d = document.createElement("td");
				t = dat.c[i][j][0]/dat.c[i][j][1];
				d.innerHTML = dat.calPercent(t);
				r.appendChild(d);
				d = document.createElement("td");
				t = dat.c[i][j][0]/dat.c[i][0];
				d.innerHTML = dat.calPercent(t);
				r.appendChild(d);
				tbDoe.appendChild(r);
			}
		}
	}
};
