function init () {
	// lzr_tools.trace();
}

var dat = {
	n: 1000000,
	sv: [],

	crtSv: function () {
		return Math.floor(Math.random() * 6) + 1;
	},

	crtV: function () {
		var v = [
			dat.crtSv(),
			dat.crtSv(),
			dat.crtSv()
		];
		return v;
	},

	retry: function () {
		var i, p = dat.sv.length;
		for (i = 0; i < dat.n; i ++) {
			dat.add(dat.crtV());
		}

// console.log(dat.sv);
		dat.check1(p);
		// dat.check2(p);
	},

	add: function (v) {
		dat.sv.push(v);
	},

	// 统计与上一期重号情况
	check1: function (i) {
var s = "";
		var j, k, v, a, b, t;
		a = [0,0,0,0,0,0,0];
		if (!dat.r1) {
			dat.r1 = [];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
s += v[0] + "," + v[1] + "," + v[2] + ",";
			b = [a[v[0]], a[v[1]], a[v[2]]];
			for (j = 1; j < 7; j ++) {
				if (j === v[0] || j === v[1] || j === v[2]) {
					a[j] ++;
				} else {
					a[j] = 0;
				}
			}
			for (j = 0; j < 2; j ++) {
				for (k = j + 1; k < 3; k ++) {
					if (b[k] > b[j]) {
						t = b[k];
						b[k] = b[j];
						b[j] = t;
					}
				}
			}
s += b[0] + "," + b[1] + "," + b[2] + "<br/>";
			dat.r1.push (b);
		}
// console.log(dat.r1);
vDoe.innerHTML = s;
	},

	// 对重号进行进一步分析
	check2: function (i) {
		var v, p;
		if (!dat.r2) {
			dat.r2 = [];
		}
		for (; i < dat.r1.length; i ++) {
			v = dat.r1[i];
			if (v[0]) {
				if (!dat.r2[v[0]]) {
					dat.r2[v[0]] = [0, 0];
				}
				dat.r2[v[0]][0] ++;
				p = dat.r1[i + 1];
				if (p && (p[0] === v[0] + 1)) {
					dat.r2[v[0]][1] ++;
				}
			}
		}
console.log(dat.r2);
	},

};
