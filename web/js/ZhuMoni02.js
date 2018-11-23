function init () {
	lzr_tools.trace();
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
		if (p === 0) {
			p = 1;
		}
		for (i = 0; i < dat.n; i ++) {
			dat.add(dat.crtV());
		}

// console.log(dat.sv);
		// dat.check1(p);
		// dat.check2(p);
		// dat.check3(p);
		// dat.check4(p);
		dat.check5(p);
	},

	add: function (v) {
		dat.sv.push(v);
	},

	// 统计固定两号的命中率。有连续超过25次失败的风险！
	check1: function (i) {
		var j, k, v, a, n, t, max;
		if (!dat.r1) {
			dat.r1 = [0];
		}
		a = [1, 2];
		max = 0;
		t = 0;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			n = 0;
			for (j = 0; j < 3; j ++) {
				for (k = 0; k < a.length; k ++) {
					if (v[j] === a[k]) {
						n ++;
						break;
					}
				}
			}
			switch (n) {
				case 0:
					dat.r1.push([-1, a[0], a[1], v]);
					t ++;
					if (max < t) {
						max = t;
					}
					break;
				case 1:
					dat.r1.push([0, a[0], a[1], v]);
					break;
				default:
					dat.r1.push([1, a[0], a[1], v]);
					dat.r1[0] ++;
					t = 0;
					break;
			}
		}
console.log(dat.r1);
console.log(dat.r1[0] / dat.sv.length);
console.log(max);
	},

	// 随机两号的命中率。同样有连续超过29次失败的风险！
	check2: function (i) {
		var j, k, v, a, n, t, max;
		if (!dat.r2) {
			dat.r2 = [0];
		}
		a = [0, 0];
		max = 0;
		t = 0;
		for (; i < dat.sv.length; i ++) {
			a[0] = dat.crtSv();
			a[1] = dat.crtSv();
			while (a[1] === a[0]) {
				a[1] = dat.crtSv();
			}
			v = dat.sv[i];
			n = 0;
			for (j = 0; j < 3; j ++) {
				for (k = 0; k < a.length; k ++) {
					if (v[j] === a[k]) {
						n ++;
						break;
					}
				}
			}
			switch (n) {
				case 0:
					dat.r2.push([-1, a[0], a[1], v]);
					t ++;
					if (max < t) {
						max = t;
					}
					break;
				case 1:
					dat.r2.push([0, a[0], a[1], v]);
					break;
				default:
					dat.r2.push([1, a[0], a[1], v]);
					dat.r2[0] ++;
					t = 0;
					break;
			}
		}
console.log(dat.r2);
console.log(dat.r2[0] / dat.sv.length);
console.log(max);
	},

	// 最近两号的命中率。同样有连续超过25次失败的风险！
	check3: function (i) {
		var j, k, v, a, n, t, max, p;
		if (!dat.r3) {
			dat.r3 = [0];
		}
		a = [0, 0];
		max = 0;
		t = 0;
		for (; i < dat.sv.length; i ++) {
			k = 1;
			p = dat.sv[i - k];
			a[0] = p[2];
			a[1] = a[0];
			while (a[1] === a[0]) {
				for (j = 0; j < 3; j ++) {
					if (p[j] !== a[0]) {
						a[1] = p[j];
						break;
					}
				}
				k ++;
				p = dat.sv[i - k];
			}
			v = dat.sv[i];
			n = 0;
			for (j = 0; j < 3; j ++) {
				for (k = 0; k < a.length; k ++) {
					if (v[j] === a[k]) {
						n ++;
						break;
					}
				}
			}
			switch (n) {
				case 0:
					dat.r3.push([-1, a[0], a[1], v]);
					t ++;
					if (max < t) {
						max = t;
					}
					break;
				case 1:
					dat.r3.push([0, a[0], a[1], v]);
					break;
				default:
					dat.r3.push([1, a[0], a[1], v]);
					dat.r3[0] ++;
					t = 0;
					break;
			}
		}
console.log(dat.r3);
console.log(dat.r3[0] / dat.sv.length);
console.log(max);
	},

	// 一个，同样有连续25次的风险
	check4: function (i) {
		var j, k, v, a, n, t, max;
		if (!dat.r4) {
			dat.r4 = [0];
		}
		a = [1];
		max = 0;
		t = 0;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			n = 0;
			for (j = 0; j < 3; j ++) {
				for (k = 0; k < a.length; k ++) {
					if (v[j] === a[k]) {
						n ++;
						break;
					}
				}
			}
			if (n > 0) {
				dat.r4.push(1);
				dat.r4[0] ++;
				t = 0;
			} else {
				dat.r4.push(-1);
				t ++;
				if (max < t) {
					max = t;
				}
			}
		}
console.log(dat.r4);
console.log(dat.r4[0] / dat.sv.length);
console.log(max);
	},

	// 三个，同样有连续25次的风险
	check5: function (i) {
		var j, k, v, a, n, t, max, b;
		if (!dat.r5) {
			dat.r5 = [0];
		}
		a = [1, 3, 5];
		max = 0;
		t = 0;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			n = 0;
			b = 0;
			for (j = 0; j < 3; j ++) {
				for (k = 0; k < a.length; k ++) {
					if (v[j] === a[k]) {
						n ++;
						if (b === 0) {
							b = v[j];
						} else if (v[j] == b) {
							b = -1;
						}
						break;
					}
				}
			}
			if (n > 2) {
				b = 1;
			} else if (n === 2) {
				if (b === -1) {
					b = 0;
				} else {
					b = 1;
				}
			} else {
				b = -1;
			}
			dat.r5.push(b);
			if (b === 1) {
				dat.r5[0] ++;
				t = 0;
			} else if (b === -1) {
				t ++;
				if (max < t) {
					max = t;
				}
			}
		}
console.log(dat.r5);
console.log(dat.r5[0] / dat.sv.length);
console.log(max);
	},

};
