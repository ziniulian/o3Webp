function init () {
	/*
		测试结果 ： 失败！
	*/
	lzr_tools.trace();
}

var dat = {
	sv: [],		// 原始数据
	c: [],		// 备选库
	tp: [0, 5, 4, 4, 4, 4, 6, 8, 11, 16, 23],		// 正向倍率
	fp: [100, 600],		// 反向倍率
	b: 0,		// 状态		0 : 正向投; 1 : 一次补; 2 : 二次补;
	p: 0,		// 指针
	v: 0,		// 倍数
	n: 0,		// 个数


	moni: {
		// 模拟
		do: 0,
		p: 0,

		t: [0],
		f: 0,
		po: 0,
		bo: 0,
		po2: 0,
		bo2: 0,


		// 生成随机数
		crtV: function () {
			return Math.floor(Math.random() * 37);
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
		var i, p, v, k, n;
		n = dat.tp.length;
		p = dat.sv.length - 1;
		v = dat.sv[p];

// alert(v + "");
// console.log(v);

		// 计算间隔
		for (i = p - 1; i >= dat.p; i --) {
			if (dat.sv[i] === v) {
				dat.p = p;
				break;
			}
		}
		k = p - dat.p;

		if (dat.p) {
			// 收益计算
			if (dat.n) {
				if (dat.c[v]) {
					dat.moni.p += (36 - dat.n) * dat.v;
				} else {
					dat.moni.p -= dat.n * dat.v;
				}
			}

			if (dat.b) {
				if (dat.c[v]) {
if (dat.b === 1) {
	dat.moni.bo ++;
} else {
	dat.moni.bo2 ++;
}
					dat.b = 0;
				} else if (dat.b === 1) {
dat.moni.po ++;
					dat.b = 2;
					dat.v = dat.fp[1];
				} else {
dat.moni.po2 ++;
console.log("---- Err ---- : " + p);
					dat.b = 0;
				}
			}
			if (dat.b === 0) {
				dat.n = 0;
				dat.v = 0;
				if ((k < n) && dat.tp[k]) {
					dat.b = 0;
					dat.n = k + 1;
					dat.v = dat.tp[k];
					for (i = 0; i < 37; i ++) {
						dat.c[i] = false;
					}
					for (i = dat.p; i <= p; i ++) {
						dat.c[dat.sv[i]] = true;
					}
				} else if (k === n) {
dat.moni.f ++;
					dat.b = 1;
					dat.n = 37 - k - 1;
					dat.v = dat.fp[0];
					for (i = 0; i < 37; i ++) {
						dat.c[i] = true;
					}
					for (i = dat.p; i <= p; i ++) {
						dat.c[dat.sv[i]] = false;
					}
				}
			}

			// dat.flush();
		}

		// if (dat.n) {
		// 	n = [];
		// 	for (i = 0; i < dat.c.length; i ++) {
		// 		if (dat.c[i]) {
		// 			n.push(i);
		// 		}
		// 	}
		// 	dat.moni.t.push({
		// 		v: dat.v,
		// 		c: n
		// 	});
		// } else {
		// 	dat.moni.t.push(0);
		// }

		// 自动模拟
		if (dat.moni.do > 0) {
			dat.sv.push(dat.moni.crtV());
			dat.moni.do --;
			// setTimeout(dat.calc, 1);
			dat.calc();
		} else {
			monipDoe.innerHTML = dat.moni.p;
// console.log(dat.sv);
// console.log(dat.moni.t);
console.log(dat.moni);
		}
	},

	retry: function () {
		dat.moni.do = 6000;
		// dat.moni.do = 10;
		dat.sv.push(dat.moni.crtV());
		dat.calc();
	},

	// 页面刷新
	flush: function () {
		var i, d;
		rDoe.innerHTML = "";
		pDoe.innerHTML = dat.v;
		if (dat.v) {
			for (i = 0; i < dat.c.length; i++) {
				if (dat.c[i]) {
					d = document.createElement("div");
					d.className = "rDoe";
					d.innerHTML = i;
					rDoe.appendChild(d);
				}
			}
		}
		monipDoe.innerHTML = dat.moni.p;
	}
};
