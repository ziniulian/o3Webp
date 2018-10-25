function init () {
	/*
	非常稳定的比例 ：
		各点平均间隔 ： 24.38%
	*/
	dat.crtSv();
}

var dat = {
	sv: null,		// 原始数据
	tv: null,		// 统计结果

	// 开始分析
	fx: function () {
		console.log(dat.sv);

		// dat.ctP();
		// dat.ctPshow();
		// dat.ctD();
		// dat.ctDl("s", "st", "stt", "sft", "ssl", "ssg", "sslm", "ssgm", "sdl", "sdg", "sdlm", "sdgm");		// 单双
		// dat.ctDl("m", "mt", "mtt", "mft", "msl", "msg", "mslm", "msgm", "mbl", "mbg", "mblm", "mbgm");		// 大小
		// dat.ctDt("st", "stl", "stg", "stlm", "stgm", "sfl", "sfg", "sflm", "sfgm");		// 单双
		// dat.ctDt("mt", "mtl", "mtg", "mtlm", "mtgm", "mfl", "mfg", "mflm", "mfgm");		// 大小
		// dat.ctDShow();

		// 路纸测试
		// dat.runLu("二连同", dat.tv.ctD.st, [-1,1]);
		// dat.runLu("三连同", dat.tv.ctD.st, [-1,1,1]);
		// dat.runLu("三同一反s（前置二连同）", dat.tv.ctD.st, [-1,1,-1,-1,-1,1]);
		// dat.runLu("三同一反m（前置二连同）", dat.tv.ctD.mt, [-1,1,-1,-1,-1,1]);
		// dat.runLu("三同一反s（前置三连同）", dat.tv.ctD.st, [-1,1,1,-1,-1,-1,1]);
		// dat.runLu("三同一反m（前置三连同）", dat.tv.ctD.mt, [-1,1,1,-1,-1,-1,1]);
		// dat.runLu("三单两双三单", dat.tv.ctD.s, [1,-1,-1,-1,1,1,-1,-1,-1]);
		// dat.runLu("三大两小三大", dat.tv.ctD.s, [1,-1,-1,-1,1,1,-1,-1,-1]);
		// dat.runLu("三同s", dat.tv.ctD.st, [1,-1,-1,-1]);
		// dat.runLu("三同m", dat.tv.ctD.mt, [1,-1,-1,-1]);
		// dat.runLu("四同s", dat.tv.ctD.st, [1,-1,-1,-1,-1]);
		// dat.runLu("四同m", dat.tv.ctD.mt, [1,-1,-1,-1,-1]);
		// dat.runLu("三同两反s", dat.tv.ctD.st, [1,-1,-1,-1,1,1]);
		// dat.runLu("三同两反m", dat.tv.ctD.mt, [1,-1,-1,-1,1,1]);
		// dat.runLu("四同两反s", dat.tv.ctD.st, [1,-1,-1,-1,-1,1,1]);
		// dat.runLu("四同两反m", dat.tv.ctD.mt, [1,-1,-1,-1,-1,1,1]);
		// dat.runLu("四同三反s", dat.tv.ctD.st, [1,-1,-1,-1,-1,1,1,1]);
		// dat.runLu("四同三反m", dat.tv.ctD.mt, [1,-1,-1,-1,-1,1,1,1]);
		// dat.runLu("三同两反三同s", dat.tv.ctD.st, [1,-1,-1,-1,1,1,-1,-1,-1]);
		// dat.runLu("三同两反三同m", dat.tv.ctD.mt, [1,-1,-1,-1,1,1,-1,-1,-1]);

		// dat.runLu("六同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1], 50);
		// dat.runLu("六同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1], 43);
		// dat.runLu("三同一反两同s", dat.tv.ctD.st, [-1,-1,-1,1,-1,-1], 50);
		// dat.runLu("三同一反两同s", dat.tv.ctD.st, [-1,-1,-1,1,-1,-1], 43);
		// dat.runLu("三同两反一同s", dat.tv.ctD.st, [-1,-1,-1,1,1,-1], 50);
		// dat.runLu("三同两反一同s", dat.tv.ctD.st, [-1,-1,-1,1,1,-1], 43);
		// dat.runLu("四同一反一同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1], 50);
		// dat.runLu("四同一反一同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1], 43);
		// dat.runLu("三同三反s", dat.tv.ctD.st, [-1,-1,-1,1,1,1], 50);
		// dat.runLu("三同三反s", dat.tv.ctD.st, [-1,-1,-1,1,1,1], 43);
		// dat.runLu("四同两反s", dat.tv.ctD.st, [-1,-1,-1,-1,1,1], 50);
		// dat.runLu("四同两反s", dat.tv.ctD.st, [-1,-1,-1,-1,1,1], 43);
		// dat.runLu("五同一反s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,1], 50);
		// dat.runLu("五同一反s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,1], 43);

		// dat.runLu("七同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1,-1], 50);
		// dat.runLu("七同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1,-1], 43);
		// dat.runLu("四同一反两同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1], 50);
		// dat.runLu("四同一反两同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1], 43);

		// dat.runLu("八同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1,-1,-1], 50);
		// dat.runLu("八同单", dat.tv.ctD.s, [-1,-1,-1,-1,-1,-1,-1,-1], 50);
		// dat.runLu("八同大", dat.tv.ctD.m, [-1,-1,-1,-1,-1,-1,-1,-1], 50);
		// dat.runLu("八同s", dat.tv.ctD.st, [-1,-1,-1,-1,-1,-1,-1,-1], 43);
		// dat.runLu("四同一反三同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1,-1], 50);
		// dat.runLu("四同一反三同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1,-1], 43);
		// dat.runLu("四同一反两同一反s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1,1], 50);
		// dat.runLu("四同一反四同s", dat.tv.ctD.st, [-1,-1,-1,-1,1,-1,-1,1], 43);
		// dat.runLu("三同一反四同s", dat.tv.ctD.st, [-1,-1,-1,1,-1,-1,-1,-1], 50);
		// dat.runLu("三同一反四同s", dat.tv.ctD.st, [-1,-1,-1,1,-1,-1,-1,-1], 43);
		// dat.runLu("三同一反四同单", dat.tv.ctD.s, [-1,-1,-1,1,-1,-1,-1,-1], 43);
		// dat.runLu("三同一反四同大", dat.tv.ctD.m, [-1,-1,-1,1,-1,-1,-1,-1], 43);

		// 破关测试
		// dat.allPo(1);
		// dat.runPo("连1", dat.tv.ctP[1][4], 2);
		// dat.runPo("隔1", dat.tv.ctP[1][0], 1);

		// 随机模拟
		// dat.runR();

		// 围的概率
		// dat.ctW();

		// 点测试
		// dat.runP([0,0,0,0], 1, 30);
		// dat.runP([0,0,1,0,0], 1, 30);
		// dat.runP([0,0,0,0,0], 1, 30);
		// dat.runP([0,0,1,0,0,0], 1, 30);
		// dat.runP([0,0,0,1,0,0], 1, 30);

		// dat.runP([0,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,0,0,1,0,0], 1, 30);
		// dat.runP([0,0,0,1,0,0,0], 1, 30);
		// dat.runP([0,0,1,0,0,0,0], 1, 30);
		// dat.runP([0,1,0,0,0,0,0], 1, 30);
		// dat.runP([1,0,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,1,0,1,0,0,0], 1, 30);
		// dat.runP([0,1,0,0,1,0,0,0], 1, 30);
		// dat.runP([0,1,0,1,0,0,0,0], 1, 30);
		// dat.runP([0,1,1,0,0,0,0,0], 1, 30);
		// dat.runP([1,0,1,0,0,0,0,0], 1, 30);
		// dat.runP([0,1,0,1,0,1,0,1,0,1,0], 1, 30);
		// dat.runP([0,1,1,0,0,1,0,1,0,1,0], 1, 30);
		// dat.runP([0,0,0,0,0,0,0], 1, 30);
		// dat.runP([1,0,0,0,0,0,0], 2, 30);
		// dat.runP([0,0,0,0,0,0,0], 2, 30);

		// 3 : 3.89% = 25 , 2.75% = 36
		// dat.runP([0,1,0,0], 1, 5);
		// dat.runP([0,1,0,0], 2, 5);
		// dat.runP([0,1,0,0], 3, 5);
		// dat.runP([0,1,0,0], 4, 5);
		// dat.runP([0,1,0,0], 5, 5);
		// dat.runP([0,1,0,0], 6, 5);
		// dat.runP([0,0,0], 1, 5);
		// dat.runP([0,0,0], 2, 5);
		// dat.runP([0,0,0], 3, 5);
		// dat.runP([0,0,0], 4, 5);
		// dat.runP([0,0,0], 5, 5);
		// dat.runP([0,0,0], 6, 5);

		// 4 : 2.27% = 44 , 1.58% = 63
		// dat.runP([0,1,0,0,0], 1, 10);
		// dat.runP([0,1,0,0,0], 2, 10);
		// dat.runP([0,1,0,0,0], 3, 10);
		// dat.runP([0,1,0,0,0], 4, 10);
		// dat.runP([0,1,0,0,0], 5, 10);
		// dat.runP([0,1,0,0,0], 6, 10);
		// dat.runP([0,0,0,0], 1, 10);
		// dat.runP([0,0,0,0], 2, 10);
		// dat.runP([0,0,0,0], 3, 10);
		// dat.runP([0,0,0,0], 4, 10);
		// dat.runP([0,0,0,0], 5, 10);
		// dat.runP([0,0,0,0], 6, 10);

		// 4 : 1.36% = 74 , 0.94% = 107
		// dat.runP([0,1,0,0,0], 1, 5);
		// dat.runP([0,1,0,0,0], 2, 5);
		// dat.runP([0,1,0,0,0], 3, 5);
		// dat.runP([0,1,0,0,0], 4, 5);
		// dat.runP([0,1,0,0,0], 5, 5);
		// dat.runP([0,1,0,0,0], 6, 5);
		// dat.runP([0,0,0,0], 1, 5);
		// dat.runP([0,0,0,0], 2, 5);
		// dat.runP([0,0,0,0], 3, 5);
		// dat.runP([0,0,0,0], 4, 5);
		// dat.runP([0,0,0,0], 5, 5);
		// dat.runP([0,0,0,0], 6, 5);

		// 5 : 0.82% = 120 , 0.56% = 178
		// dat.runP([0,1,0,0,0,0], 1, 10);
		// dat.runP([0,1,0,0,0,0], 2, 10);
		// dat.runP([0,1,0,0,0,0], 3, 10);
		// dat.runP([0,1,0,0,0,0], 4, 10);
		// dat.runP([0,1,0,0,0,0], 5, 10);
		// dat.runP([0,1,0,0,0,0], 6, 10);
		// dat.runP([0,0,0,0,0], 1, 10);
		// dat.runP([0,0,0,0,0], 2, 10);
		// dat.runP([0,0,0,0,0], 3, 10);
		// dat.runP([0,0,0,0,0], 4, 10);
		// dat.runP([0,0,0,0,0], 5, 10);
		// dat.runP([0,0,0,0,0], 6, 10);

		// 6 : 0.7% = 142
		// dat.runP([0,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,0,0,0,0], 2, 30);
		// dat.runP([0,0,0,0,0,0], 3, 30);
		// dat.runP([0,0,0,0,0,0], 4, 30);
		// dat.runP([0,0,0,0,0,0], 5, 30);
		// dat.runP([0,0,0,0,0,0], 6, 30);

		// 6 : 0.51% = 200 , 0.39% = 255
		// dat.runP([0,0,1,0,0,0,0], 1, 20);
		// dat.runP([0,0,0,0,0,0], 1, 20);
		// dat.runP([0,0,0,0,0,0], 2, 20);
		// dat.runP([0,0,0,0,0,0], 3, 20);
		// dat.runP([0,0,0,0,0,0], 4, 20);
		// dat.runP([0,0,0,0,0,0], 5, 20);
		// dat.runP([0,0,0,0,0,0], 6, 20);

		// 7 : 0.26% = 380 , 0.19% = 525
		// dat.runP([0,0,1,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,0,0,0,0,0], 2, 30);
		// dat.runP([0,0,0,0,0,0,0], 3, 30);
		// dat.runP([0,0,0,0,0,0,0], 4, 30);
		// dat.runP([0,0,0,0,0,0,0], 5, 30);
		// dat.runP([0,0,0,0,0,0,0], 6, 30);

		// 8: 0.09 = 1110
		// dat.runP([0,0,0,0,0,0,0,0], 1, 30);
		// dat.runP([0,0,0,0,0,0,0,0], 2, 30);
		// dat.runP([0,0,0,0,0,0,0,0], 3, 30);
		// dat.runP([0,0,0,0,0,0,0,0], 4, 30);
		// dat.runP([0,0,0,0,0,0,0,0], 5, 30);
		// dat.runP([0,0,0,0,0,0,0,0], 6, 30);
	},

	crtSv: function () {
		// var n = 200;
		var n = 1000000;
		var v;
		ctpDoe.innerHTML = "";
		ctdDoe.innerHTML = "";
		luDoe.innerHTML = "";
		dat.sv = [];
		dat.tv = {};
		for (var i = 0; i < n; i ++) {
			v = [
				0,
				dat.rv(6) + 1,
				dat.rv(6) + 1,
				dat.rv(6) + 1
			];
			v[0] = v[1] + v[2] + v[3];
			dat.sv.push (v);
		}

		setTimeout(dat.fx, 100);
	},

	rv: function (n) {
		return Math.floor(Math.random() * n);
	},

	clear: function (d) {
		d.innerHTML = "";
	},

	calPercent: function (v) {
		var s = Math.floor(v * 100000) + "%";
		while (s.length < 5) {
			s = "0" + s;
		}
		var n = s.length - 4;
		return s.substring(0, n) + "." + s.substring(n);
	},

	crtTr: function (a) {
		var d, r = document.createElement("tr");
		for (var i = 0; i < a.length; i ++) {
			d = document.createElement("td");
			d.innerHTML = a[i];
			r.appendChild(d);
		}
		return r;
	},

	// 大小单双统计
	ctD: function () {
		var o = {
			s: [],		// 单双值。	-1，双；1，单
			ss: 0,		// 单总数
			sd: 0,		// 双总数

			m: [],		// 大小值	-1，小；1，大
			ms: 0,		// 小总数
			mb: 0,		// 大总数
		};
		var i, v, p;
		for (i = 0; i < dat.sv.length; i ++) {
			v =  dat.sv[i];
			if (v[1] === v[2] && v[2] === v[3]) {
				o.s.push(0);	// 单双
				o.m.push(0);	// 大小
			} else {
				if (v[0]%2) {
					// 单
					o.s.push(1);
					o.ss ++;
				} else {
					// 双
					o.s.push(-1);
					o.sd ++;
				}
				if (v[0] > 10) {
					// 大
					o.m.push(1);
					o.ms ++;
				} else {
					// 小
					o.m.push(-1);
					o.mb ++;
				}
			}
		}
		dat.tv.ctD = o;
	},

	// 连号统计
	ctDl: function (n, t, tt, ft, l1, g1, lm1, gm1, l0, g0, lm0, gm0) {
		var i, p, v;
		var o = dat.tv.ctD;
		o[t] = [-2];	// 正反值	-1，不同；1，相同
		o[tt] = 0;		// 同值总数
		o[ft] = 0;		// 反值总数

		o[l1] = [0];	// 1连
		o[g1] = [0];	// 1隔
		o[lm1] = 0;		// 1最大连续数
		o[gm1] = 0;		// 1最大间隔数

		o[l0] = [0];	// 0连
		o[g0] = [0];	// 0隔
		o[lm0] = 0;		// 0最大连续数
		o[gm0] = 0;		// 0最大间隔数

		for (i = 1; i < o[n].length; i ++) {
			v = o[n][i];
			p = o[n][i - 1];
			switch (v) {
				case 1:
					switch (p) {
						case 1:
							o[l1][o[l1].length - 1] ++;
							o[g0][o[g0].length - 1] ++;
							o[t].push(1);
							o[tt] ++;
							break;
						case -1:
							o[l1].push(1);
							o[g0].push(1);
							o[t].push(-1);
							o[ft] ++;
							break;
						case 0:
							o[l1].push(1);
							o[g0][o[g0].length - 1] ++;
							o[t].push(-2);
							break;
					}
					break;
				case -1:
					switch (p) {
						case -1:
							o[l0][o[l0].length - 1] ++;
							o[g1][o[g1].length - 1] ++;
							o[t].push(1);
							o[tt] ++;
							break;
						case 1:
							o[l0].push(1);
							o[g1].push(1);
							o[t].push(-1);
							o[ft] ++;
							break;
						case 0:
							o[l0].push(1);
							o[g1][o[g1].length - 1] ++;
							o[t].push(-2);
							break;
					}
					break;
				case 0:
					o[t].push(0);
					switch (p) {
						case 1:
							o[g1].push(1);
							o[g0][o[g0].length - 1] ++;
							break;
						case -1:
							o[g1][o[g1].length - 1] ++;
							o[g0].push(1);
							break;
						case 0:
							o[g1][o[g1].length - 1] ++;
							o[g0][o[g0].length - 1] ++;
							break;
					}
					break;
			}

			if (o[lm1] < o[l1][o[l1].length - 1]) {
				o[lm1] = o[l1][o[l1].length - 1];
			}
			if (o[gm1] < o[g1][o[g1].length - 1]) {
				o[gm1] = o[g1][o[g1].length - 1];
			}
			if (o[lm0] < o[l0][o[l0].length - 1]) {
				o[lm0] = o[l0][o[l0].length - 1];
			}
			if (o[gm0] < o[g0][o[g0].length - 1]) {
				o[gm0] = o[g0][o[g0].length - 1];
			}
		}
	},

	// 单双同统计
	ctDt: function (n, tl, tg, tlm, tgm, fl, fg, flm, fgm) {
		var i, p, v;
		var o = dat.tv.ctD;
		o[tl] = [0];	// 同连
		o[tg] = [0];	// 同隔
		o[tlm] = 0;		// 同最大连续数
		o[tgm] = 0;		// 同最大间隔数

		o[fl] = [0];	// 反连
		o[fg] = [0];	// 反隔
		o[flm] = 0;		// 反最大连续数
		o[fgm] = 0;		// 反最大间隔数

		for (i = 1; i < o[n].length; i ++) {
			v = o[n][i];
			p = o[n][i - 1];

			if (p === v) {
				if (v === 1) {
					o[tl][o[tl].length - 1] ++;
					o[fg][o[fg].length - 1] ++;
				} else if (v === -1) {
					o[fl][o[fl].length - 1] ++;
					o[tg][o[tg].length - 1] ++;
				} else {
					o[tg][o[tg].length - 1] ++;
					o[fg][o[fg].length - 1] ++;
				}
			} else {
				if (v === 1) {
					o[tl].push(1);
					if (p === -1) {
						o[fg].push(1);
					} else {
						o[fg][o[fg].length - 1] ++;
					}
				} else if (v === -1) {
					o[fl].push(1);
					if (p === 1) {
						o[tg].push(1);
					} else {
						o[tg][o[tg].length - 1] ++;
					}
				} else {
					if (p === 1) {
						o[tg].push(1);
						o[fg][o[fg].length - 1] ++;
					} else if (p === -1) {
						o[tg][o[tg].length - 1] ++;
						o[fg].push(1);
					} else {
						o[tg][o[tg].length - 1] ++;
						o[fg][o[fg].length - 1] ++;
					}
				}
			}

			if (o[tlm] < o[tl][o[tl].length - 1]) {
				o[tlm] = o[tl][o[tl].length - 1];
			}
			if (o[flm] < o[fl][o[fl].length - 1]) {
				o[flm] = o[fl][o[fl].length - 1];
			}
			if (o[tgm] < o[tg][o[tg].length - 1]) {
				o[tgm] = o[tg][o[tg].length - 1];
			}
			if (o[fgm] < o[fg][o[fg].length - 1]) {
				o[fgm] = o[fg][o[fg].length - 1];
			}
		}
	},

	// 显示单双大学的统计结果
	ctDShow: function () {
		var t = ctdDoe;
		var o = dat.tv.ctD;
		t.innerHTML = "";
		t.appendChild(dat.crtTr([
			"单",
			dat.calPercent(o.ss/o.s.length),
			o.ssgm,
			o.sslm,
			dat.calPercent(o.ssg.length/o.s.length)
		]));
		t.appendChild(dat.crtTr([
			"双",
			dat.calPercent(o.sd/o.s.length),
			o.sdgm,
			o.sdlm,
			dat.calPercent(o.sdg.length/o.s.length)
		]));
		t.appendChild(dat.crtTr([
			"大",
			dat.calPercent(o.mb/o.m.length),
			o.mbgm,
			o.mblm,
			dat.calPercent(o.mbg.length/o.m.length)
		]));
		t.appendChild(dat.crtTr([
			"小",
			dat.calPercent(o.ms/o.m.length),
			o.msgm,
			o.mslm,
			dat.calPercent(o.msg.length/o.m.length)
		]));
		t.appendChild(dat.crtTr([
			"同s",
			dat.calPercent(o.stt/o.s.length),
			o.stgm,
			o.stlm,
			dat.calPercent(o.stg.length/o.s.length)
		]));
		t.appendChild(dat.crtTr([
			"反s",
			dat.calPercent(o.sft/o.s.length),
			o.sfgm,
			o.sflm,
			dat.calPercent(o.sfg.length/o.s.length)
		]));
		t.appendChild(dat.crtTr([
			"同m",
			dat.calPercent(o.mtt/o.m.length),
			o.mtgm,
			o.mtlm,
			dat.calPercent(o.mtg.length/o.m.length)
		]));
		t.appendChild(dat.crtTr([
			"反m",
			dat.calPercent(o.mft/o.m.length),
			o.mfgm,
			o.mflm,
			dat.calPercent(o.mfg.length/o.m.length)
		]));
	},

	// 点数统计
	ctP: function () {
		var i, j, k, v, p, a = [], r = [];
		for (i = 1; i <= 6; i ++) {
			r[i] = [
				[0],		// 隔
				0,			// 点
				0,			// 对
				0,			// 围
				[0],		// 连
				0,			// 最大间隔数
				0			// 最大连续数
			]
		}
		for (i = 0; i < dat.sv.length; i ++) {
			v =  dat.sv[i];
			for (j = 1; j <= 6; j ++) {
				a[j] = 0;
			}
			for (j = 1; j <= 3; j ++) {
				a[v[j]] ++;
			}
			for (j = 1; j <= 6; j ++) {
				// 检查上期是否出现
				if (i) {
					for (k = 1; k <= 3; k ++) {
						if (p[k] === j) {
							break;
						}
					}
					k = (k !== 4);
				} else {
					k = false;
				}

				// 计数
				if (a[j]) {
					if (k) {
						r[j][4][r[j][4].length - 1] ++;
						if (r[j][6] < r[j][4][r[j][4].length - 1]) {
							r[j][6] = r[j][4][r[j][4].length - 1]
						}
					} else {
						r[j][4].push(1);
					}
					r[j][a[j]] ++;
				} else {
					if (k) {
						r[j][0].push(1);
					} else {
						r[j][0][r[j][0].length - 1] ++;
						if (r[j][5] < r[j][0][r[j][0].length - 1]) {
							r[j][5] = r[j][0][r[j][0].length - 1]
						}
					}
				}
			}
			p = v;
		}

		dat.tv.ctP = r;
	},

	// 显示点数统计结果
	ctPshow: function () {
		var t = ctpDoe;
		var o = dat.tv.ctP;
		t.innerHTML = "";
		for (i = 1; i <= 6; i ++) {
			t.appendChild(dat.crtTr([
				i,
				dat.calPercent(o[i][1]/dat.sv.length),
				dat.calPercent(o[i][2]/dat.sv.length),
				dat.calPercent(o[i][3]/dat.sv.length),
				o[i][5],
				o[i][6],
				dat.calPercent(o[i][0].length/dat.sv.length)
			]));
		}
	},

	// 围的概率
	ctW: function () {
		var i, v, g = 0, a = [], max = 0;
		for (i = 0; i < dat.sv.length; i ++) {
			v = dat.sv[i];
			if (v[1] === v[2] && v[2] === v[3]) {
				a.push(g);
				if (max < g) {
					max = g;
				}
				g = 0;
			} else {
				g ++;
			}
		}
		console.log(a);
		console.log(max);
	},

	// 路纸测试
	runLu: function (nam, d, c, l) {
		var o = {
			c: [],		// 匹配记录
			l: [],		// 限制内匹配记录
			max: 0,
			min: d.length
		};
		var b, g, i, j, k = 0;
		for (i = 0; i < d.length; i ++) {
			b = true;
			for (j = 0; j < c.length; j ++) {
				if (c[j] !== d[i +j]) {
					b = false;
					break;
				}
			}
			if (b) {
				o.c.push(i);
				if (k) {
					g = i - o.c[k - 1];
					if (g > o.max) {
						o.max = g;
					}
					if (g < o.min) {
						o.min = g;
					}
					if (g < l) {
						o.l.push(i);
					}
				}
				k ++;
			}
		}

		luDoe.appendChild(dat.crtTr([
			nam,
			dat.calPercent(o.c.length/d.length),
			o.min,
			o.max,
			dat.calPercent(o.l.length/d.length)
		]));
	},

	// 破关测试
	runPo: function (nam, d, l) {
		var o = [
			0,		// 最大连保
			[],		// 保记录
			0,		// 保总数
			0,		// 最大连破
			[],		// 破记录
			0		// 破总数
		];
		var b, i, p, n;
		for (i = 0; i < d.length; i ++) {
			if (d[i] === l) {
				b = 1;	// 保
			} else if (d[i] > l) {
				b = 4;	// 破
			} else {
				b = 0;
			}
			if (b) {
				if (b === p) {
					o[b][o[b].length - 1] ++;
					n = o[b][o[b].length - 1];
					if (o[b - 1] < n) {
						o[b - 1] = n;
					}
				} else {
					o[b].push(1);
				}
				o[b + 1] ++;
				p = b;
			}
		}
		// console.log(o);

		poDoe.appendChild(dat.crtTr([
			l + "_" + nam,
			o[2],
			o[5],
			o[0],
			o[3]
		]));
	},

	// 破关全分析
	allPo: function (n) {
		dat.runPo("连单", dat.tv.ctD.ssl, n);
		dat.runPo("连双", dat.tv.ctD.sdl, n);
		dat.runPo("连大", dat.tv.ctD.mbl, n);
		dat.runPo("连小", dat.tv.ctD.msl, n);
		dat.runPo("连同s", dat.tv.ctD.stl, n);
		dat.runPo("连反s", dat.tv.ctD.sfl, n);
		dat.runPo("连同m", dat.tv.ctD.mtl, n);
		dat.runPo("连反m", dat.tv.ctD.mfl, n);

		dat.runPo("隔单", dat.tv.ctD.ssg, n);
		dat.runPo("隔双", dat.tv.ctD.sdg, n);
		dat.runPo("隔大", dat.tv.ctD.mbg, n);
		dat.runPo("隔小", dat.tv.ctD.msg, n);
		dat.runPo("隔同s", dat.tv.ctD.stg, n);
		dat.runPo("隔反s", dat.tv.ctD.sfg, n);
		dat.runPo("隔同m", dat.tv.ctD.mtg, n);
		dat.runPo("隔反m", dat.tv.ctD.mfg, n);

		dat.runPo("连1", dat.tv.ctP[1][4], n);
		dat.runPo("连2", dat.tv.ctP[2][4], n);
		dat.runPo("连3", dat.tv.ctP[3][4], n);
		dat.runPo("连4", dat.tv.ctP[4][4], n);
		dat.runPo("连5", dat.tv.ctP[5][4], n);
		dat.runPo("连6", dat.tv.ctP[6][4], n);

		dat.runPo("隔1", dat.tv.ctP[1][0], n);
		dat.runPo("隔2", dat.tv.ctP[2][0], n);
		dat.runPo("隔3", dat.tv.ctP[3][0], n);
		dat.runPo("隔4", dat.tv.ctP[4][0], n);
		dat.runPo("隔5", dat.tv.ctP[5][0], n);
		dat.runPo("隔6", dat.tv.ctP[6][0], n);
	},

	// 随机模拟
	runR: function () {
		var b, v, r, i, j, k = 0, n = 0, max = 0, a = [], mm = 0;
		for (i = 0; i < dat.sv.length; i ++) {
			b = false;
			v = dat.sv[i];
			r = dat.rv(6) + 1;
			for (j = 1; j < 4; j ++) {
				if (r === v[j]) {
					b = true;
					break;
				}
			}
			if (b) {
				if (k) {
					a.push(k);
					if (k > 4) {
						mm ++;
					}
				}
				k = 0;
				n ++;
			} else {
				k ++;
				if (max < k) {
					max = k;
				}
			}
		}
		console.log(a);
		console.log(n);
		console.log(mm);
		console.log(max);
	},

	runP: function (c, p, l) {
		var i, j, k, g, v, b, n, min, max = 0, m = [], ml = [];
		n = dat.sv.length - c.length;
		l ++;
		min = n;
		for (i = 0; i < n; i ++) {
			v = dat.sv[i];
			b = false;
			for (k = 1; k < 4; k ++) {
				if (v[k] === p) {
					b = true;
					break;
				}
			}
			if (b) {
				for (j = 0; j < c.length; j ++) {
					if (c[j] === 0) {
						v = dat.sv[i + 1];
						for (k = 1; k < 4; k ++) {
							if (v[k] === p) {
								b = false;
								break;
							}
						}
					}
					if (b) {
						i ++;
					} else {
						break;
					}
				}
			}
			if (b) {
				m.push(i - c.length);
				g = m[m.length - 1] - m[m.length - 2] - c.length - 1;
				if (g > max) {
					max = g;
				}
				if (g < min) {
					min = g;
				}
				if (g < l) {
					ml.push(m[m.length - 1]);
				}
			}
		}

		g = p + "_";
		for (i = 0; i < c.length; i ++) {
			g += c[i];
		}
		luDoe.appendChild(dat.crtTr([
			g,
			dat.calPercent(m.length/n),
			min,
			max,
			dat.calPercent(ml.length/n)
		]));
	}
};
