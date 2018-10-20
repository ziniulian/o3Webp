function init () {
	lzr_tools.trace();
}

var dat = {
	tim: 0,		// 次数
	lu: {t:0},		// 路线集合
	c: null,	// 当前路线
	v: false,	// 当前值
	z: -1,		// 当前位置。	-2:为同，1元投注; -1:为反，1元投注; 其它对应路线的策略。
	max: 14,		// 最大值
	txtn: 0,	// 译码
	txts: ["红", "黑", "大", "小", "单", "双"],	// 译文
	p: [		// 注额（2-9-4328）
		[1, 6],
		[1, 18],
		[3, 44],
		[6, 99],
		[12, 215],
		[26, 461],
		[55, 982],
		[1, 6],
		[1, 18],
		[3, 44],
		[6, 99],
		[12, 215],
		[26, 461],
		[55, 982]
	],
	po: [],		// 破局数
	bo: [],		// 保局数

	// 添加行
	addR: function (o, y) {
		var r = o.r[y];
		if (!r) {
			r = document.createElement("tr");
			for (var d, i = 0; i <= o.x + 1; i ++) {
				d = document.createElement("td");
				d.onclick = LZR.bind(d, dat.setT, o, i, y);
				r.appendChild(d);
			}
			o.r[y] = r;
			o.t.appendChild(r);
		}
		return r;
	},

	// 添加列
	addD: function (o, x, y) {
		var d;
		for (var i = 0; i < o.r.length; i ++) {
			d = document.createElement("td");
			d.onclick = LZR.bind(d, dat.setT, o, x, i);
			o.r[i].appendChild(d);
		}
	},

	// 获取对应坐标的单元格
	getD: function (o, x, y) {
		return o.r[y].childNodes[x];
	},

	// 设置单元格
	setT: function (o, x, y) {
		if (o.stu === 2) {
			if ((x === o.x) && (y === (o.y + 1))) {
				o.y = y;
				o.v.push (false);
				dat.addR(o, y + 1);
				dat.getD(o, x, y).className = "scd";
			} else if ((y === 0) && (x === (o.x + 1))) {
				o.x = x;
				o.y = 0;
				o.v.push (true);
				dat.addD(o, x + 1, y);
				dat.getD(o, x, y).className = "scd";
			}
		}
	},

	// 创建路线
	crtLu: function () {
		// 路线对象
		var o = {
			id: "L" + dat.lu.t,
			limit: 0,	// 次数界限
			tim: 0,		// 创建时间，每次保存会更新此时间
			stu: 2,		// 状态。	0:停用; 1:启用;	2:修改中
			x: 0,
			y: 0,
			v: [true],		// 路线。	true:表示相同;	false:表示不同
			r: [],			// tr集合
			t: document.createElement("table"),	// 表格
			doe: document.createElement("div"),	// 容器
			savBtn: document.createElement("div"),	// 保存按钮
			runBtn: document.createElement("div"),	// 启用按钮
			disBtn: document.createElement("div"),	// 停用按钮
			modBtn: document.createElement("div"),	// 修改按钮
			delBtn: document.createElement("div")	// 删除按钮
		};

		o.t.border = 1;
		o.doe.className = "out3";
		o.savBtn.innerHTML = "保存";
		o.savBtn.onclick = LZR.bind(o, dat.savLu, o);
		o.runBtn.innerHTML = "启用";
		o.runBtn.onclick = LZR.bind(o, dat.runLu, o);
		o.disBtn.innerHTML = "<font color='red'>停用</font>";
		o.disBtn.onclick = LZR.bind(o, dat.disLu, o);
		o.modBtn.innerHTML = "修改";
		o.modBtn.onclick = LZR.bind(o, dat.modLu, o);
		o.delBtn.innerHTML = "删除";
		o.delBtn.onclick = LZR.bind(o, dat.delLu, o);
		o.doe.appendChild(o.t);
		o.doe.appendChild(o.delBtn);
		o.doe.appendChild(o.modBtn);
		o.doe.appendChild(o.runBtn);
		o.doe.appendChild(o.disBtn);
		o.doe.appendChild(o.savBtn);

		dat.addR(o, 0);
		dat.addR(o, 1);
		dat.getD(o, 0, 0).className = "scd";
		dat.modLu(o);

		dat.lu[o.id] = o;
		dat.lu.t ++;
		luDoe.insertBefore(o.doe, luDoe.childNodes[0]);
	},

	// 启用路线，只有停用后，才可进行修改或删除
	runLu: function (o) {
		if (!dat.c) {
			dat.c = o;
			dat.z = -1;
			dat.v = false;
			o.stu = 1;
			o.disBtn.className = "btnLu Lc_noselect";
			o.savBtn.className = "Lc_nosee";
			o.runBtn.className = "Lc_nosee";
			o.modBtn.className = "Lc_nosee";
			o.delBtn.className = "Lc_nosee";
			dat.flush();
		}
	},

	// 停用路线
	disLu: function (o) {
		dat.c = null;
		dat.z = -1;
		dat.v = false;
		dat.disLucss(o);
		dat.flush();
	},

	// 线路停用时样式
	disLucss: function (o) {
		o.stu = 0;
		o.delBtn.className = "btnLu Lc_noselect";
		o.modBtn.className = "btnLu Lc_noselect";
		o.runBtn.className = "btnLu Lc_noselect";
		o.savBtn.className = "Lc_nosee";
		o.disBtn.className = "Lc_nosee";
	},

	// 修改路线
	modLu: function (o) {
		o.stu = 2;
		o.savBtn.className = "btnLu Lc_noselect";
		o.runBtn.className = "Lc_nosee";
		o.disBtn.className = "Lc_nosee";
		o.modBtn.className = "Lc_nosee";
		o.delBtn.className = "Lc_nosee";
	},

	// 保存路线
	savLu: function (o) {
		o.tim = dat.tim;
		o.limit = Math.floor(Math.pow(2, o.v.length) * 0.4);
		if (o.limit > 43) {
			o.limit = 43;
		}
		dat.disLucss(o);
	},

	// 删除路线
	delLu: function (o) {
		luDoe.removeChild(o.doe);
		LZR.del(dat.lu, o.id);
	},

	// 刷新页面
	flush: function () {
		timDoe.innerHTML = dat.tim;
		zDoe.innerHTML = dat.z + 1;
		vDoe.innerHTML = dat.getTxt();
		if (dat.c) {
			limDoe.innerHTML = dat.c.tim + dat.c.limit - dat.tim;
			maxDoe.innerHTML = (dat.max > dat.c.v.length) ? dat.c.v.length : dat.max;
		} else {
			limDoe.innerHTML = 0;
			maxDoe.innerHTML = 0;
		}
		if (dat.checkLimit()) {
			if (dat.z < 0) {
				p0Doe.innerHTML = 1;
				p1Doe.innerHTML = 2;
			} else {
				p0Doe.innerHTML = dat.p[dat.z][0];
				p1Doe.innerHTML = dat.p[dat.z][1];
			}
		} else {
			p0Doe.innerHTML = 0;
			p1Doe.innerHTML = 0;
		}
	},

	// 破局记录
	savPo: function (z, t) {
		var a = dat.po[z];
		if (!a) {
			a = [];
			dat.po[z] = a;
		}
		a.push(t);
		document.getElementById("p" + z + "Deo").innerHTML += t + ",";
	},

	// 保局记录
	savBo: function (z, t) {
		var a = dat.bo[z];
		if (!a) {
			a = [];
			dat.bo[z] = a;
		}
		a.push(t);
		document.getElementById("b" + z + "Deo").innerHTML += t + ",";
	},

	// 设置译文
	setTxt: function (n) {
		dat.setTxtScd(dat.txtn, "");
		if (dat.txtn === n) {
			dat.txtn = 0;
		} else {
			dat.txtn = n;
			dat.setTxtScd(n, "scd");
		}
		dat.flush();
	},

	// 设置译文的选中样式
	setTxtScd: function (n, s) {
		if (n) {
			document.getElementById("txtDoe" + n).className = "btn Lc_noselect " + s;
		}
	},

	// 译文翻转
	revTxt: function () {
		if (dat.txtn) {
			dat.setTxtScd(dat.txtn, "");
			dat.txtn = dat.revTxtn();
			dat.setTxtScd(dat.txtn, "scd");
		}
	},

	// 获取译文的反值
	revTxtn: function () {
		var r = dat.txtn;
		if (dat.txtn) {
			if (r % 2) {
				r ++;
			} else {
				r --;
			}
		}
		return r;
	},

	// 获取译文
	getTxt: function () {
		var r = "反";
		if (dat.txtn) {
			if (dat.v) {
				r = (dat.txts[dat.txtn - 1]);
			} else {
				r = (dat.txts[dat.revTxtn() - 1]);
			}
		} else if (dat.v) {
			r = "同";
		}
		return r;
	},

	// 界限检查
	checkLimit: function () {
		return dat.c && (dat.max > dat.z) && (dat.c.v.length > dat.z);
	},

	// 失败
	no: function () {
		if (dat.checkLimit()) {
			switch (dat.z) {
				case -2:
					dat.z = -1;
					dat.v = false;
					dat.revTxt();
					break;
				default:
					if (dat.v) {
						dat.revTxt();
					}
					dat.z ++;
					if (dat.z > 4) {
						dat.savPo(dat.z, dat.tim);
					}
					dat.v = dat.c.v[dat.z];
					break;
			}
			dat.tim ++;
			dat.flush();
		}
	},

	// 零
	oo: function () {
		if (dat.checkLimit()) {
			dat.z = -2;
			dat.v = true;
			dat.tim ++;
			dat.flush();
		}
	},

	// 成功
	ok: function () {
		if (dat.checkLimit()) {
			switch (dat.z) {
				case -1:
					dat.revTxt();
					break;
				case -2:
					dat.z = -1;
					dat.v = false;
					break;
				default:
					if (dat.z > 3) {
						dat.savBo(dat.z + 1, dat.tim);
					}
					if (dat.v) {
						dat.z = 0;
					} else {
						dat.z = -1;
						dat.revTxt();
					}
					break;
			}
			dat.tim ++;
			dat.flush();
		}
	}
};
