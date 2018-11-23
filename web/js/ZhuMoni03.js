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
		// dat.check1(p);
		dat.check2(p, 3);	// 大小的间隔情况
		// dat.check2(p, 4);	// 单点的间隔情况
		// dat.check2(p, 5);	// 同号的间隔情况
	},

	add: function (v) {
		var i, n = 0;
		v [3] = 0;
		v [4] = 0;
		v [5] = 0;
		for (i = 0; i < 3; i ++) {
			if (v[i] > 3) {
				n ++;
			}

			// 4. 单点命中
			if (v[i] === 1) {
				v[4] = 1;
			}
		}

		// 3. 大小 （用于投三个小点还是投三个大点的参考）
		if (n > 1) {
			v[3] = 1;
		}

		// 5.有无同号
		if (v[0] === v[1] || v[0] === v[2] || v[1] === v[2]) {
			v[5] = 1;
		}

		dat.sv.push(v);
	},

	// 统计基本的分配情况
	check1: function (i) {
		if (!dat.r1) {
			dat.r1 = 0;
		}
		for (; i < dat.sv.length; i ++) {
			if (dat.sv[i][3]) {
				dat.r1 ++;
			} else {
				dat.r1 --;
			}
		}
console.log(dat.r1);
	},

	// 统计间隔情况（包含分配情况）
	check2: function (i, k) {
		var v, g0, g1;
		if (!dat.r2) {
			dat.r2 = [[0], [0]];
		}
		g0 = 1;
		g1 = 1;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[k]) {
				if (!dat.r2[1][g1]) {
					dat.r2[1][g1] = 0;
				}
				dat.r2[1][0] ++;
				dat.r2[1][g1] ++;
				g1 = 1;
				g0 ++;
			} else {
				if (!dat.r2[0][g0]) {
					dat.r2[0][g0] = 0;
				}
				dat.r2[0][0] ++;
				dat.r2[0][g0] ++;
				g0 = 1;
				g1 ++;
			}
		}
console.log(dat.r2);
	},

};
