function init () {
	/*
		还是没有胜算的结局
	*/
	dat.init();
	lzr_tools.trace();
}

var dat = {
	n: 1000000,	// 个数
	w: 25,		// 冷热周期
	sv: [],		// 原始数据
	c: [],		// 个数统计
	s: [],		// 排序统计
	sp: 0,		// 排序用指针
	zp: null,	// 前一个非零值
	gp: 0,		// 间隔指针
	gp2: 0,		// 二次隔指针

	min: 2,
	max: 7,

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

	// 判断红黑
	getR: function (v, r) {
		if ((v > 10 && v < 19) || (v > 28)) {
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

	retry: function () {
		var i, v, p = dat.sv.length;
		if (p === 0) {
			// p = dat.dw;
			p = 1;
		}
		for (i = 0; i < dat.n; i ++) {
			v = [dat.crtV(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	// 0.本值、1.冷热、2.冷热同、3.红黑同、4.大小同、5.单双同、6.红黑、7.大小、8.单双、9.隔、10.命中位置
			dat.add(v);
		}
// console.log(dat.sv);

		dat.check1(p);
		// dat.check2(p);
		// dat.check3(p);
		// dat.check4(p);
		// dat.check5(p);
		// dat.check6(p);
		// dat.check7(p);
		// dat.check8(p);
		// dat.check9(p);
		// dat.check10(p);
	},

	init: function () {
		for (var i = 0; i < 37; i ++) {
			dat.s[i] = i;
			dat.c[i] = [0, i];		// 个数、排名
		}
	},

	add: function (v) {
		var i, p, c;
		p = dat.sv.length;

		// 判断属性
		if (v[0]) {
			v[8] = dat.getS(v[0]);
			v[6] = dat.getR(v[0], v[8]);
			v[7] = dat.getM(v[0]);
			if (dat.zp) {
				if (v[6] === dat.zp[6]) {
					v[3] = 1;
				} else {
					v[3] = -1;
				}
				if (v[7] === dat.zp[7]) {
					v[4] = 1;
				} else {
					v[4] = -1;
				}
				if (v[8] === dat.zp[8]) {
					v[5] = 1;
				} else {
					v[5] = -1;
				}
			}
		}

		// 判断间隔
		v[9] = p - dat.gp;
		for (i = (p - 1); i >= dat.gp; i --) {
			if (dat.sv[i][0] === v[0]) {
				v[10] = p - i;
				dat.gp = p;
				break;
			}
		}

		// 判断冷热
		if (p >= dat.w) {
			if (dat.c[v[0]][1] < 18) {
				v[1] = 1;	// 热
			} else {
				v[1] = -1;	// 冷
			}
			if (v[1] === dat.sv[p - 1][1]) {
				v[2] = 1;	// 冷热相同
			} else {
				v[2] = -1;	// 冷热不同
			}

			// 减一个号
			p = dat.sv[dat.sp][0];
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
			dat.sp ++;
		}

		// 加一个号
		c = dat.c[v[0]];
		c[0] ++;
		for (i = (c[1] - 1); i >= 0; i --) {
			if (dat.c[dat.s[i]][0] > c[0]) {
				break;
			} else {
				dat.c[dat.s[i]][1] = i + 1;
				dat.s[i + 1] = dat.s[i];
				dat.s[i] = v[0];
				c[1] = i;
			}
		}

		if(v[0]) {
			dat.zp = v;
		}
		dat.sv.push(v);
	},

	// 统计各间隔范围内，不同命中位置的概率是否一致。测试结果：位置基本平均，无很大差异！失败！
	check1: function (i) {
		var v;
		if (!dat.r1) {
			dat.r1 = [0];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[10]) {
				if (!dat.r1[v[9]]) {
					dat.r1[v[9]] = [0];
				}
				if (!dat.r1[v[9]][v[10]]) {
					dat.r1[v[9]][v[10]] = 0;
				}
				dat.r1[0] ++;
				dat.r1[v[9]][0] ++;
				dat.r1[v[9]][v[10]] ++;
			}
		}
console.log(dat.r1);
	},

	// 统计各间隔关口，命中时各属性的平衡性。测试结果：同性多于反性，有点奇怪，需进一步验证 ...
	check2: function (i) {
		var v, j, a, b;
		if (!dat.r2) {
			b = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			dat.r2 = [b];
		} else {
			b = dat.r2[0];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			for (j = 1; j < 9; j ++) {
				b[j] += v[j];
			}
			if (v[10]) {
				a = dat.r2[v[9]];
				if (!a) {
					a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					dat.r2[v[9]] = a;
				}
				b[0] ++;
				a[0] ++;

				for (j = 1; j < 9; j ++) {
					a[j] += v[j];
				}
			}
		}
console.log(dat.r2);
	},

	// 统计2 ~ 10 的关口，命中与非命中时，冷热反与属性同的情况。测试结果：本身冷号就多于热号，冷大于热很正常，比例并无明显差距。但属性同问题，还需继续验证到底能节约出多少个号。
	check3: function (i) {
		var v, j, o, p, min, max;

		min = 2;
		max = 10;
		if (!dat.r3) {
			dat.r3 = [];
			for (j = min; j <= max; j ++) {
				dat.r3[j] = {
					t: 0,	// 关口总数
					y: {	// 命中
						t: 0,	// 命中总数
						ll: 0,	// 前一个号为冷的数目
						rr: 0,	// 前一个号为热的数目
						r: {	// 红黑
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						},
						m: {	// 大小
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						},
						s: {	// 单双
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						}
					},
					n: {	// 未命中
						t: 0,	// 未命中总数
						ll: 0,	// 前一个号为冷的数目
						rr: 0,	// 前一个号为热的数目
						r: {	// 红黑
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						},
						m: {	// 大小
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						},
						s: {	// 单双
							t: 0,	// 相同数
							f: 0,	// 不同数
							o: 0	// 零数
						}
					}
				};
			}
		}

		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			p = dat.sv[i - 1];
			if (v[9] >= min && v[9] <= max) {
				o = dat.r3[v[9]];
				o.t ++;
				if (v[10]) {
					o.y.t ++;
					if (p[1] === -1) {
						o.y.ll ++;
					} else if (p[1] === 1) {
						o.y.rr ++;
					}
					if (v[0]) {
						if (v[3] === 1) {
							o.y.r.t ++;
						} else {
							o.y.r.f ++;
						}
						if (v[4] === 1) {
							o.y.m.t ++;
						} else {
							o.y.m.f ++;
						}
						if (v[5] === 1) {
							o.y.s.t ++;
						} else {
							o.y.s.f ++;
						}
					} else {
						o.y.r.o ++;
						o.y.m.o ++;
						o.y.s.o ++;
					}
				} else {
					o.n.t ++;
					if (p[1] === -1) {
						o.n.ll ++;
					} else if (p[1] === 1) {
						o.n.rr ++;
					}
					if (v[0]) {
						if (v[3] === 1) {
							o.n.r.t ++;
						} else {
							o.n.r.f ++;
						}
						if (v[4] === 1) {
							o.n.m.t ++;
						} else {
							o.n.m.f ++;
						}
						if (v[5] === 1) {
							o.n.s.t ++;
						} else {
							o.n.s.f ++;
						}
					} else {
						o.n.r.o ++;
						o.n.m.o ++;
						o.n.s.o ++;
					}
				}
			}
		}
console.log(dat.r3);
	},

	// 统计2 ~ 6 的关口，命中与非命中时，属性同 和 节约的号数情况。测试结果：虽然同性多于反性，但也只能是偶尔保本，长久必输，依旧无法盈利。失败！
	check4: function (i) {
		var v, j, k, o, p, t, min, max;

		min = dat.min;
		max = dat.max;
		if (!dat.r4) {
			dat.r4 = [];
			for (j = min; j <= max; j ++) {
				dat.r4[j] = {
					t: 0,	// 关口总数
					r: {	// 红黑
						c: 0,	// 节约出的号数
						cs: [],	// 节约明细
						t: {	// 相同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						f: {	// 不同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						o: {	// 零数
							y: 0,	// 命中数
							n: 0	// 未命中数
						}
					},
					m: {	// 大小
						c: 0,	// 节约出的号数
						cs: [],	// 节约明细
						t: {	// 相同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						f: {	// 不同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						o: {	// 零数
							y: 0,	// 命中数
							n: 0	// 未命中数
						}
					},
					s: {	// 单双
						c: 0,	// 节约出的号数
						cs: [],	// 节约明细
						t: {	// 相同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						f: {	// 不同数
							y: 0,	// 命中数
							n: 0	// 未命中数
						},
						o: {	// 零数
							y: 0,	// 命中数
							n: 0	// 未命中数
						}
					}
				};
			}
		}

		k = [0, 0, 0];
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			p = dat.sv[i - 1];
			if (p[0] === 0) {
				p = dat.sv[i - 2];
			}
			if (v[9] >= min && v[9] <= max) {
				o = dat.r4[v[9]];
				o.r.cs[o.t] = 0;
				o.m.cs[o.t] = 0;
				o.s.cs[o.t] = 0;
				for (j = 1; j <= v[9]; j ++) {
					t = dat.sv[i - j];
					if (t[6] !== p[6]) {
					// if (t[0] && t[6] !== p[6]) {	// 含零
						o.r.c ++;
						o.r.cs[o.t] ++;
					}
					if (t[7] !== p[7]) {
					// if (t[0] && t[6] !== p[6]) {	// 含零
						o.m.c ++;
						o.m.cs[o.t] ++;
					}
					if (t[8] !== p[8]) {
					// if (t[0] && t[6] !== p[6]) {	// 含零
						o.s.c ++;
						o.s.cs[o.t] ++;
					}
				}
				o.t ++;

				if (v[0]) {
					if (v[3] === 1) {
						if (v[10]) {
							o.r.t.y ++;
						} else {
							o.r.t.n ++;
						}
					} else {
						if (v[10]) {
							o.r.f.y ++;
						} else {
							o.r.f.n ++;
						}
					}
					if (v[4] === 1) {
						if (v[10]) {
							o.m.t.y ++;
						} else {
							o.m.t.n ++;
						}
					} else {
						if (v[10]) {
							o.m.f.y ++;
						} else {
							o.m.f.n ++;
						}
					}
					if (v[5] === 1) {
						if (v[10]) {
							o.s.t.y ++;
						} else {
							o.s.t.n ++;
						}
					} else {
						if (v[10]) {
							o.s.f.y ++;
						} else {
							o.s.f.n ++;
						}
					}
				} else if (v[10]) {
					o.r.o.y ++;
					o.m.o.y ++;
					o.s.o.y ++;
				} else {
					o.r.o.n ++;
					o.m.o.n ++;
					o.s.o.n ++;
				}
			}
		}
// console.log(dat.r4);

		dat.flush(dat.r4);
	},

	flush: function (a) {
		var i, r, d, o;
		tbDoe.innerHTML = "";

		for (i = dat.min; i <= dat.max; i ++) {
			o = a[i];
			r = document.createElement("tr");
			d = document.createElement("td");
			d.innerHTML = i;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = o.r.t.y * 36 - i * o.t + o.r.c;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = o.m.t.y * 36 - i * o.t + o.m.c;
			r.appendChild(d);
			d = document.createElement("td");
			d.innerHTML = o.s.t.y * 36 - i * o.t + o.s.c;
			r.appendChild(d);
			tbDoe.appendChild(r);
		}
	},

	// 平均间隔
	check5: function (i) {
		var v, p, n;
		// 测试结果： 平均间隔：7.3。故决定只针对间隔 7 以下的情况
		if (!dat.r5) {
			dat.r5 = [];
		}
		p = 0;
		n = 0;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[10]) {
				n ++;
				p += v[9];
				dat.r5.push([v[9], (p/n), v[10]]);
			}
		}
console.log (dat.r5);
console.log(p);
	},

	// 通过平均倍率计算盈利。经模拟，12 和 14 两个关口亏损最低。
	check6: function (i) {
		var v, n = 0;
		if (!dat.r6) {
			dat.r6 = [
				0,
				[35, 0],		// 1
				[11.22, 0],	// 1.058823529
				[5.31, 0],	// 1.155080214
				[2.97, 0],	// 1.299465241
				[1.81, 0],	// 1.509056408
				[1.15, 0],	// 1.81086769
				[0.76, 0],	// 2.247973684
				[0.5, 0],	// 2.89025188
				[0.33, 0],	// 3.853669173
				[0.22, 0],	// 5.335849624
				[0.14, 0],	// 7.683623459
				[0.09, 0],	// 11.52543519
				[0.05, 0],	// 18.0398116
				[0.03, 0],	// 29.51969171
				[0.01, 0],	// 50.60518579
			];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[10]) {
				dat.r6[0] ++;
			} else if (v[9] < 16) {
				dat.r6[v[9]][1] ++;
			}
		}
		for (i = 1; i < 16; i ++) {
			console.log(i + " , " + ((dat.r6[0] - dat.r6[i][1]) * dat.r6[i][0] - dat.r6[i][1]));
		}
// console.log (dat.r6);
	},

	// 精简的间隔统计
	check7: function (i) {
		var v;
		if (!dat.r7) {
			dat.r7 = [0];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (!dat.r7[v[9]]) {
				dat.r7[v[9]] = [0, 0];
			}
			if (v[10]) {
				dat.r7[0] ++;
				dat.r7[v[9]][1] ++;
			} else {
				dat.r7[v[9]][0] ++;
			}
		}
console.log (dat.r7);
	},

	// 六隔内的具体分析
	check8: function (i) {
		var v, m, n, p, b;
		m = 0;
		n = 0;
		/*
			最大间隔会有近20次的间距，所以最大数无意义
			六隔的概率为 45%
			六隔能连出的概率也为45%，无差别
			六隔上一次不出接这次出的概率依旧为45%，无差别
			七隔的概率为 55%
			七隔不含一的概率为 52.5% （此方式好像比七隔的亏损了略低一点点）
		*/
		if (!dat.r8) {
			dat.r8 = [];
		}
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[10]) {
				p = dat.r8.length - 1;
				// if (dat.r8[p] === 1 && dat.r8[p - 1] === 0) {
				if (dat.r8[p] === 0) {
					m ++;
					b = true;
				} else {
					b = false;
				}
				// if (v[9] > 7 || v[9] === 1) {
				if (v[9] > 6) {
					dat.r8.push(0);
				} else {
					dat.r8.push(1);
					if (b) {
						n ++;
					}
				}
			}
		}
console.log (dat.r8);
console.log (n + " , " + m + " , " + (n/m));
	},

	// 隔的隔、隔的二次方、二次隔
	check9: function (i) {
		var j, k, v, p, o;
		if (!dat.r9) {
			dat.r9 = [];
		}
		p = dat.r9.length;
		for (; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[10]) {
				k = dat.r9.length;
				o = [v[9], k - p, 0];
				for (j = k - 1; j >= p; j --) {
					if (dat.r9[j][0] === o[0]) {
						o[2] = k - j;
						p = dat.r9.length;
						break;
					}
				}
				dat.r9.push(o);
			}
		}
console.log (dat.r9);
	},

	// 二次隔统计
	check10: function (p) {
		var i, v, a = [0];
		// 此方式不好操作，依旧难以盈利
		dat.check9(p);
		for (i = 0; i < dat.r9.length; i ++) {
			v = dat.r9[i];
			if (v[1]) {
				// if (v[0] === 1) {
					if (!a[v[1]]) {
						a[v[1]] = [0, 0];
					}
					a[0] ++;
					if (v[2]) {
						a[v[1]][1] ++;
					} else {
						a[v[1]][0] ++;
					}
				// }
			}
		}
console.log(a);
	}

};
