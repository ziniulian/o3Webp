// LZR 模块加载
require("lzr");

// post 参数解析工具
var bodyParser = require("body-parser");
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

var stres = "HTTP/1.1 200 OK\r\nAccept-Ranges: bytes";

// 解析 post 参数
srv.use("*", bodyParser.urlencoded({ extended: false }));

srv.ro.post("/reLinkDat/", function (req, res) {
	if (req.body.dat) {
		var c = req.socket;
		var s, o;
		try {
			if (req.body.dat[0] === "%") {
				o = JSON.parse(decodeURIComponent(req.body.dat));
			} else {
				o = JSON.parse(req.body.dat);
			}
		} catch (e) {
			res.status(404).send("Err");
		}
		if (o && o.host && o.port) {
			c.removeAllListeners("data");
			s = net.createConnection(o.port, o.host);
			// c.pipe(s);
			// s.pipe(c);
			c.on("data", function(d) {
				s.write(d);
console.log(o.host + ":" + o.port + " >> " + d.length);
			});
			s.on("data", function(d) {
				c.write(d);
console.log(o.host + ":" + o.port + " <<---- " + d.length);
			});
			s.on("end", function() {
				c.end();
console.log(o.host + ":" + o.port + " s - end");
			});
			c.on("end", function() {
				s.end();
console.log(o.host + ":" + o.port + " c - end");
			});
			s.on("error", function () {});
			if (o.buf) {
				s.write(new Buffer(o.buf.data));
console.log(o.host + ":" + o.port + " >> " + o.buf.data.length);
			} else if (o.rok) {
				c.write(new Buffer(o.rok));
			} else {
				res.status(404).send("Err");
			}
			return true;
		}
	}
	res.status(404).send("Err");
});

srv.ro.post("/ptth/", function (req, res) {
	if (!utNode.ptth(req, "net")) {
		res.redirect(dmsrv.ds.main + "Err");
	}
});

srv.ro.post("/testDat/", function (req, res) {
	if (req.body.dat) {
		var d, o;
		if (req.body.dat[0] === "%") {
			d = decodeURIComponent(req.body.dat);
		} else {
			d = req.body.dat;
		}
		o = JSON.parse(d);
		if (o) {
			if (o.buf) {
				o.str = new Buffer(o.buf.data).toString();
			}
			res.json(o);
			res.end();
			return;
		}
	}
	res.send("Err");
	res.end();
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
