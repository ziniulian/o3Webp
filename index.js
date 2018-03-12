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

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

// var stres = Buffer.from("HTTP/1.1 200 OK\r\n\r\n\t<w*p>\t");
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
				var s = net.createConnection(o.p, decodeURIComponent(o.h));
				s.on("data", function (dat) {
					s.removeAllListeners("data");
					s.pipe(c);
					c.write(Buffer.concat([stres, dat]));
console.log(o.h + ":" + o.p + " <<---- " + dat.length);
				});
				s.on("end", function() {
					c.end();
console.log(o.h + ":" + o.p + " s - end");
				});
				s.on("error", function () {
					s.end();
					c.end();
console.log(o.h + ":" + o.p + " s - err");
				});
				s.write(buf.slice(e));
			} else {
				res.status(404).send("Err");
			}
		} else {
			res.status(404).send("Err");
		}
	});
});

srv.ro.post("/ptths/", function (req, res) {
	res.send("OK!");
});

srv.ro.post("/ptthsDat/:id", function (req, res) {
	res.send(req.params.id + " _ OK!");
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
