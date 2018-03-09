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

// 数据解包
utNode.unpckBuffer = function (d/*as:Object*/, st/*as:Object*/, tag/*as:Object*/) {
	for (var i = 0; i < d.length; i ++) {
		switch (d[i]) {
			case 0x0d:		// \r
				if (st.ts === null) {
					if (st.t === 0 || st.t === 2) {
						st.t ++;
					} else {
						st.t = 0;
					}
				}
				break;
			case 0x0a:		// \n
				if (st.ts === null) {
					if (st.t === 1 || st.t === 3) {
						st.t ++;
					} else {
						st.t = 0;
					}
				}
				break;
			case 0x7B:		// {
				if (st.ts === null) {
					if (st.t === 4) {
						st.ts = "{";
						st.t = 1;
					} else {
						st.t = 0;
					}
				} else {
					st.t ++;
					st.ts += "{";
				}
				break;
			case 0x7D:		// }
				if (st.ts) {
					st.t --;
					st.ts += "}";
					if (st.t === 0) {
// console.log("unpck : " + st.ts.length);
						var tt = new Buffer(JSON.parse(st.ts).data);
						tag.write(tt);
						st.ts = null;
					}
				}
				break;
			default:
				if (st.ts === null) {
					st.t = 0;
				} else {
					st.ts += String.fromCharCode(d[i]);
				}
				break;
		}
	}
};

// 数据封包
utNode.pckBuffer = function (d/*as:Object*/, salt/*as:Object*/, tag/*as:Object*/) {
	var t = JSON.stringify(d);
// console.log("pck : " + t.length);
console.log(1);
	tag.write(new Buffer(salt + (t.length) + "\r\n\r\n" + t));
console.log(2);
};

// 逆 HTTP
utNode.ptth = function (req/*as:Object*/)/*as:boolean*/ {
	if (req.body.dat) {
		var c = req.socket;
		var st = { t: 0, ts: null };
		var s, o, pbuf, ubuf;
		try {
			o = JSON.parse(req.body.dat);
			o.host = decodeURIComponent(o.host);
		} catch (e) {
			return false;
		}
		if (o && o.host && o.port) {
			c.removeAllListeners("data");
			s = net.createConnection(o.port, o.host);

			pbuf = LZR.bind(this, function(d) {
				this.pckBuffer(d, stres, c);
console.log(o.host + ":" + o.port + " <<---- " + d.length);
			});
			ubuf = LZR.bind(this, function(d) {
				this.unpckBuffer(d, st, s);
console.log(o.host + ":" + o.port + " >> " + d.length);
			});
			s.on("data", pbuf);
			c.on("data", ubuf);
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
			} else if (o.rok) {
				this.pckBuffer(new Buffer(o.rok), stres, c);
			} else {
				return false;
			}
			return true;
		}
	}
	return false;
};

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

var stres = "HTTP/1.1 200 OK\r\nAccept-Ranges: bytes\r\nContent-Length: ";

// 解析 post 参数
srv.use("*", bodyParser.urlencoded({ extended: false }));

srv.ro.post("/ptth/", function (req, res) {
	if (!utNode.ptth(req)) {
		res.redirect(dmsrv.ds.main + "Err");
	}
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
