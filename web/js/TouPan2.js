function init () {
	/*
		模拟结果：失败！
	*/
	lzr_tools.trace();
}

var dat = {
	sv: [],		// 原始数据
	n: 5,		// 个数
	c: [],		// 备选库

	moni: {
		// 模拟
		do: 90,
		// do: 0,
		p: 0,

		// 生成随机数
		crtV: function () {
			return Math.floor(Math.random() * 37);
		}
	},

	setN: function (n) {
		if (n) {
			n = Math.floor(n - 0);
			if ((n > 27) || (n < 3)) {
				dat.n = 0;
				nDoe.value = "";
				// 背景闪烁
			} else {
				dat.n = n;
				nDoe.className = "";
				vDoe.focus();
			}
		}
	},

	setV: function (v) {
		if (v) {
			v = Math.floor(v - 0);
			if ((v > 36) || (v < 0)) {
				// 背景闪烁
			} else {
				dat.sv.push(v);
				vDoe.className = "vDoe";
				vDoe.value = "";
				dat.calc();
			}
		}
	},

	// 计算
	calc: function () {
		var i, b, v, p, n, a;
		p = dat.sv.length - 1;
		v = dat.sv[p];

// alert(v + "");

		// 模拟收益计算
		if (dat.moni.do) {
			if (dat.c.length) {
				b = true;
				for (i = 0; i < dat.c.length; i ++) {
					if (dat.c[i] === v) {
						// 赢
						dat.moni.p += (36 - dat.c.length);
						b = false;
						break;
					}
				}
				if (b) {
					// 输
					dat.moni.p -= dat.c.length;
					console.log(dat.sv.length);
				}
			}
			monipDoe.innerHTML = dat.moni.p;
		}

		// 正式操作
		a = [];
		dat.c = [];
		n = 37 - dat.n;
		for (i = 0; i < 37; i ++) {
			a[i] = true;
		}

		for (i = p; i > 0; i --) {
			j = dat.sv[i];
			if (a[j]) {
				a[j] = false;
				n --;
				if (n === 0) {
					break;
				}
			}
		}

		if (n === 0) {
			for (i = 0; i < 37; i ++) {
				if (a[i]) {
					dat.c.push(i);
				}
			}
			dat.flush();
		}

		// 自动模拟
		if (dat.moni.do > 0) {
			dat.sv.push(dat.moni.crtV());
			dat.moni.do --;
			setTimeout(dat.calc, 1);
			// dat.calc();
		} else {
			// monipDoe.innerHTML = dat.moni.p;
			console.log(dat.sv);
		}
	},

	retry: function () {
		// dat.check1(9);
		// dat.check1(10);
		// dat.check1(11);
		// dat.check1(12);
		// dat.check1(13);
		// dat.check1(14);
		// dat.check1(15);
		// dat.check1(16);
		// dat.check1(17);
		// dat.check1(18);
		// dat.check1(19);
		// dat.check1(20);
		// dat.check1(21);
		// dat.check1(22);
		// dat.check1(23);
		// dat.check1(24);
		// dat.check1(25);
		// dat.check1(26);
		// dat.check1(27);
		// dat.check1(28);
		// dat.check1(29);
		// dat.check1(30);
		// dat.check1(32);
		// dat.check1(33);
		// dat.check1(34);
		// dat.check1(35);
		// dat.check1(36);
		// dat.check1(37);
		// dat.check1(38);

		dat.moni.do = 6000;
		dat.sv.push(dat.moni.crtV());
		dat.calc();
	},

	// 页面刷新
	flush: function () {
		var i, d;
		rDoe.innerHTML = "";
		for (i = 0; i < dat.c.length; i++) {
			d = document.createElement("div");
			d.className = "rDoe";
			d.innerHTML = dat.c[i];
			rDoe.appendChild(d);
		}
	},

	// 检查近n期内重复出现的概率
	check1: function (n) {
		var i, j, k = 0;
		for (i = n; i < dat.sv.length; i ++) {
			for (j = n; j > 0; j --) {
				if (dat.sv[i] === dat.sv[i - j]) {
					k++;
					break;
				}
			}
		}
		console.log((37 - n) + " : " + (k/dat.sv.length));
	}
};
