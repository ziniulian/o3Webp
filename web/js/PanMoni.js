function init () {
	for (var i = 0; i < dat.n; i ++) {
		dat.sv.push(dat.crtV());
	}

	// vDoe.innerHTML = dat.check();
	// dat.check0(10);
	dat.check1(1);
	dat.check1(2);
	dat.check1(3);
	dat.check1(4);
	dat.check1(5);
	dat.check1(6);
	dat.check1(7);
	dat.check1(8);
	dat.check1(9);
	dat.check1(10);
	dat.check1(11);
	dat.check1(12);
	dat.check1(13);
	dat.check1(14);
	dat.check1(15);
	dat.check1(16);
	dat.check1(17);
	dat.check1(18);
	dat.check1(19);
	dat.check1(20);
	dat.check1(21);
	dat.check1(22);
	dat.check1(23);
	dat.check1(24);
	dat.check1(25);
	dat.check1(26);
	dat.check1(27);
	dat.check1(28);
	dat.check1(29);
	dat.check1(30);
	dat.check1(31);
	dat.check1(32);
	dat.check1(33);
	dat.check1(34);
	dat.check1(35);
	dat.check1(36);
	dat.check1(37);
	dat.check1(38);

	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	sv: [],		// 原始数据

	// 生成随机数
	crtV: function () {
		return Math.floor(Math.random() * 37);
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

	calPercent: function (v) {
		var s = Math.floor(v * 100000) + "%";
		while (s.length < 5) {
			s = "0" + s;
		}
		var n = s.length - 4;
		return s.substring(0, n) + "." + s.substring(n);
	},

	// 检查第一区连续出现的最大次数（包含0）
	check: function () {
		/*不超过16次*/
		var i, t = 0, max = 0;
		for (i = 0; i <dat.n; i ++) {
			if (dat.sv[i] < 10) {
				t ++;
				if (max < t) {
					max = t;
				}
			} else {
				t = 0;
			}
		}
		return max;
	},

	// 检查近n期内重复出现的概率
	check0: function (n) {
		console.log(dat.sv);
		var i, j, a = [], max = 0;
		for (i = n; i < dat.n; i ++) {
			for (j = n; j > 0; j --) {
				if (dat.sv[i] === dat.sv[i - j]) {
					a.push(i);
					break;
				}
			}
		}

		console.log(a);
		b = [];
		j = 0;
		for (i = 1; i < a.length; i ++) {
			if ((a[i] -1) === a[i - 1]) {
				j ++;
				if (max < j) {
					max = j;
				}
				b.push(i);
			} else {
				j = 0;
			}
		}
		console.log (b);
		console.log (max + 2);
	},

	// 检查近n期内重复出现的概率
	check1: function (n) {
		var i, j, k = 0;
		for (i = n; i < dat.n; i ++) {
			for (j = n; j > 0; j --) {
				if (dat.sv[i] === dat.sv[i - j]) {
					k++;
					break;
				}
			}
		}
		vDoe.innerHTML += (37 - n) + " : " + dat.calPercent((n-1)/36) + " - " + dat.calPercent(k/dat.n) + "<br />";
	}
};
