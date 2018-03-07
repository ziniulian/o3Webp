// LZR 模块加载
require("lzr");

// post 参数解析工具
var bodyParser = require("body-parser");

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

// 解析 post 参数
srv.use("*", bodyParser.urlencoded({ extended: false }));

srv.ro.post("/ptth/", function (req, res) {
	if (!utNode.ptth(req, "net")) {
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
