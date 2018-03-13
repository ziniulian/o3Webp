// LZR 模块加载
require("lzr");

// LZR 子模块加载
LZR.load([
	"LZR.HTML",
	"LZR.Node.Srv",
	"LZR.Node.Srv.O3srvPoxSrv"
]);

// 域名
var dmsrv = {ds: {main: LZR.HTML.domain}};

// 代理功能
// var po = new LZR.Node.Srv.O3srvPoxSrv();
var po = new LZR.Node.Srv.O3srvPoxSrv({showLog: true});

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

srv.ro.post("/ptth/", LZR.bind(po, po.getPost, LZR.bind(po, po.hdHttp)));

srv.ro.post("/ptths/:key/:id", LZR.bind(po, po.getPost, LZR.bind(po, po.hdHttps)));

// LOGO图片
srv.ro.get("/clear/", function (req, res) {
	res.send(po.delSrvs() + " 条服务被清除");
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
