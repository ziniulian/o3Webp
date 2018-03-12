// LZR 模块加载
require("lzr");

// post 参数解析工具
var net = require("net");

// LZR 子模块加载
LZR.load([
	"LZR.HTML",
	"LZR.Node.Util",
	"LZR.Node.Srv"
]);

// 域名
var dmsrv = {ds: {main: LZR.HTML.domain}};
var utNode = LZR.getSingleton(LZR.Node.Util);
var srvarr = [];

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

var stres = new Buffer("HTTP/1.1 200 OK\r\n\r\n\t<w*p>\t");

srv.ro.post("/ptth/", function (req, res) {
	var arr = [];
	req.on("data", function (dat) {
		arr.push(dat);
	});
	req.on ("end", function () {
		var buf = Buffer.concat(arr);
		var e = buf.indexOf("}") + 1;
		if (e > 0) {
			var o = false;
			try {
				o = JSON.parse(buf.slice(0, e));
			} catch (err) {}
			if (o && o.h && o.p) {
				var c = req.socket;
				c.removeAllListeners("data");
				var s = net.createConnection(o.p, o.h);
				s.on("error", function () {
					s.end();
					c.end();
// console.log(o.h + ":" + o.p + " s - err");
				});
				if (o.k) {
					var sas = srvarr.length;
					srvarr.push(s);
					var sae = srvarr.length;
					if ((sae - sas) > 1) {
// console.log("... " + (sae - sas));
						for (var i = sas; i < sae; i ++) {
							if (srvarr[i] === s) {
								sas = i;
								break;
							}
						}
					}
					c.write(new Buffer("HTTP/1.1 200 OK\r\n\r\n" + sas));
					c.end();
				} else {
					var b = false;
					s.on("data", function (dat) {
						if (b) {
							c.write(dat);
						} else {
							b = true;
							c.write(Buffer.concat([stres, dat]));
						}
// console.log(o.h + ":" + o.p + " <<---- " + dat.length);
					});
					s.on("end", function() {
						c.end();
// console.log(o.h + ":" + o.p + " s - end");
					});
					s.write(buf.slice(e));
				}
			} else {
				res.status(404).send("数据错误");
			}
		} else {
			res.status(404).send("没有结束符");
		}
	});
});

srv.ro.post("/ptths/:id", function (req, res) {
	var arr = [];
	req.on("data", function (dat) {
		arr.push(dat);
	});
	req.on ("end", function () {
		var buf = Buffer.concat(arr);
		var s = srvarr[req.params.id - 0];
		if (s) {
			var b = false;
			var c = req.socket;
			c.removeAllListeners("data");
			s.removeAllListeners("data");
			s.on("data", function (dat) {
				if (b) {
					c.write(dat);
				} else {
					b = true;
					c.write(Buffer.concat([stres, dat]));
				}
console.log(req.params.id + " <<---- " + dat.length);
			});
			s.write(buf);
console.log(req.params.id + " >> " + buf.length);
		} else {
			res.status(404).send("没有远程服务");
		}
	});
});

// LOGO图片
srv.ro.get("/clear/", function (req, res) {
	var n = srvarr.length;
	for (var i = 0; i < n; i ++) {
		srvarr[i].end();
	}
	if (n) {
		srvarr = [];
	}
	res.send(n + " 条服务被清除");
});

// LOGO图片
srv.ro.get("/favicon.ico", function (req, res) {
	res.redirect(dmsrv.ds.main + "favicon.ico");
});

// 公共样式
srv.ro.get("/base.css", function (req, res) {
	res.redirect(dmsrv.ds.main + "css/common/base.css");
});

// 通用工具
srv.ro.get("/tools.js", function (req, res) {
	res.redirect(dmsrv.ds.main + "js/tools.js");
});

// 静态主页设置
srv.ro.setStaticDir("/", "./web");

srv.use("*", function (req, res) {
	res.redirect(dmsrv.ds.main + "Err");
});

// 服务启动
srv.start();
console.log("LZRwebp start " + srv.ip + ":" + srv.port);
