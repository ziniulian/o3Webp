function init () {
	lzr_tools.trace();
}

var dat = {
	x: 0,
	y: 0,
    z: 0,
	p: 10,		// 利润
	n: 0,
	tim: 0,		// 投注次数
	t: [],		// 投注集合。	true: 表示相同；		false：表示不同
    r: [],		// tr元素集合

	reset: function () {
		tbDoe.innerHTML = "";
    	tsDoe.innerHTML = "";
        dat.x = -1;
        dat.y = 0;
        dat.z = -1;
		dat.n = 0;
		dat.tim = 0;
        dat.t = [];
        dat.r = [];
        dat.addR(0, 0);
        dat.addR(0, 1);
		vDoe.innerHTML = "";
		pDoe.innerHTML = "";
		stDoe.innerHTML = 0;
		ztDoe.innerHTML = 0;
		ttDoe.innerHTML = 0;
		ptDoe.innerHTML = 0;
	},

    // 添加行
    addR: function (x, y) {
        var r = dat.r[y];
        if (!r) {
            r = document.createElement("tr");
			r.className = "tzt";
            for (var d, i = 0; i <= x; i ++) {
                d = document.createElement("td");
                d.onclick = LZR.bind(d, dat.setT, i, y);
                r.appendChild(d);
            }
            tbDoe.appendChild(r);
        }
        dat.r[y] = r;
        return r;
    },

    // 添加列
    addD: function (x, y) {
        var d, dd;
        for (var i = 0; i < dat.r.length; i ++) {
            d = document.createElement("td");
            d.onclick = LZR.bind(d, dat.setT, x, i);
            if (i === 0) {
                dd = dat.r[i].lastChild;
            }
            dat.r[i].appendChild(d);
        }
        return dd;
    },

    // 获取对应坐标的单元格
    getD: function (x, y) {
        var r = dat.r[y];
        if (r) {
            return r.childNodes[x];
        } else {
            return null;
        }
    },

    // 设置单元格
    setT: function (x, y) {
        var d;
        if ((x === dat.x) && (y === (dat.y + 1))) {
            dat.x = x;
            dat.y = y;
            dat.addT(false);
            dat.addR(x + 1, y + 1);
            d = dat.getD(x, y);
            if (d) {
                d.className = "scd";
            }
        } else if ((y === 0) && (x === (dat.x + 1))) {
            dat.x = x;
            dat.y = y;
            dat.addT(true);
            d = dat.addD(x + 1, y);
            if (d) {
                d.className = "scd";
            }
        }
    },

    // 添加投注值
    addT: function (v) {
        var d = document.createElement("div");
		var p = Math.pow(2, dat.n);
        d.className = "t Lc_noselect";
        d.onclick = dat.scdT;
        d.innerHTML = (v ? "同" : "反");
		dat.n ++;
        dat.t.push({
            v: v,
			p: (Math.pow(2, dat.n) - 1) * dat.p,
            doe: d
        });
        tsDoe.appendChild(d);
		dat.flush(true);
    },

	// 投注
    scdT: function () {
		var d = tsDoe.childNodes[dat.z + 1];
		if (this == d) {
			d.className = "t Lc_noselect scd";
			dat.z ++;
			dat.flush();
		}
    },

	// 清空
    clear: function () {
		var o;
        for (var i in dat.t) {
			o = dat.t[i];
            o.doe.className = "t Lc_noselect";
        }
		dat.z = -1;
		dat.flush();
    },

	// 刷新计划
	flush: function (notAdd) {
		var n;
		if (!notAdd) {
			n = ttDoe.innerHTML - 0;
			dat.tim ++;
			ztDoe.innerHTML = dat.tim;
		} else {
			n = Math.pow(2, dat.n);
			ttDoe.innerHTML = n;
			ptDoe.innerHTML = (n * 2 - dat.n - 2) * dat.p;
		}
		n = Math.floor(n * 0.4);
		if (n > dat.tim) {
			stDoe.innerHTML = n - dat.tim;
		} else {
			stDoe.innerHTML = 0;
		}

		var o = dat.t[dat.z + 1];
		if (o) {
			vDoe.innerHTML = (o.v ? "同 :" : "反 :");
			pDoe.innerHTML = o.p;
		} else {
			vDoe.innerHTML = "";
			pDoe.innerHTML = "Game Over!";
		}
	}

};
