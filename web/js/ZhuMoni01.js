function init () {
	lzr_tools.trace();
}

var dat = {
	n: 1000000,
	sv: [],
	gp: 0,	// 和值间隔指针

	crtV: function () {
		var v = [
			0,	// 和
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			0,	// 和值间隔
			0,	// 和值间隔命中的位置
		];
		if (!(v[1] === v[2] && v[2] === v[3])) {
			v[0] = v[1] + v[2] + v[3];
		}
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

console.log(dat.sv);
		dat.check1(p);
		// dat.check2(p);
	},

	add: function (v) {
		var i, p;
		p = dat.sv.length;

		// 判断间隔
		v[4] = p - dat.gp;
		if (v[0]) {
			for (i = (p - 1); i >= dat.gp; i --) {
				if (dat.sv[i][0] === v[0]) {
					v[5] = p - i;
					dat.gp = p;
					break;
				}
			}
		}

		dat.sv.push(v);
	},

	// 统计各间隔范围内，不同命中位置的概率是否一致。测试结果：零号位命中的概率略高于其它位置。但此差距不足以盈利。
	check1: function (i) {
		var v;
		if (!dat.r1) {
			dat.r1 = [0];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[5]) {
				if (!dat.r1[v[4]]) {
					dat.r1[v[4]] = [0];
				}
				if (!dat.r1[v[4]][v[5]]) {
					dat.r1[v[4]][v[5]] = 0;
				}
				dat.r1[0] ++;
				dat.r1[v[4]][0] ++;
				dat.r1[v[4]][v[5]] ++;
			}
		}
console.log(dat.r1);
	},

	// 统计各间隔范围内，不同值的概率是否符合基本概率。测试结果：与基本概率相符，无差异！
	check2: function (i) {
		var v;
		if (!dat.r2) {
			dat.r2 = [0];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[5]) {
				if (!dat.r2[v[4]]) {
					dat.r2[v[4]] = [0];
				}
				if (!dat.r2[v[4]][v[0]]) {
					dat.r2[v[4]][v[0]] = 0;
				}
				dat.r2[0] ++;
				dat.r2[v[4]][0] ++;
				dat.r2[v[4]][v[0]] ++;
			}
		}
console.log(dat.r2);
	},

};
