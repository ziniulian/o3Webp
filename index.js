// LZR 模块加载
require("lzr");

// LZR 子模块加载
LZR.load([
	"LZR.HTML",
	"LZR.Node.Srv",
	"LZR.Node.Srv.O3srvPoxSrv"
]);

// 代理功能
var po = new LZR.Node.Srv.O3srvPoxSrv();
// var po = new LZR.Node.Srv.O3srvPoxSrv({showLog: true});

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

// 需要用到的工具
var tools = {
	mUrl: LZR.HTML.domain,
	dm: null	// 数据库管理模块
};

srv.ro.post("/ptth/", LZR.bind(po, po.getPost, LZR.bind(po, po.hdHttp)));

srv.ro.post("/ptths/:key/:id", LZR.bind(po, po.getPost, LZR.bind(po, po.hdHttps)));

// LOGO图片
srv.ro.get("/clear/", function (req, res) {
	var o = po.delSrvs();
	res.send(o[0] + " 条服务被清除<br/><br/>\n" + o[1]);
});

// LOGO图片
srv.ro.get("/favicon.ico", function (req, res) {
	res.sendFile("Logo.png", {
		root: "./common/"
	});
});

// 公共样式
srv.ro.get("/base.css", function (req, res) {
	res.sendFile("base.css", {
		root: "./common/"
	});
});
srv.ro.get("/block.css", function (req, res) {
	res.sendFile("block.css", {
		root: "./common/"
	});
});

// 通用工具
srv.ro.get("/tools.js", function (req, res) {
	res.sendFile("tools.js", {
		root: "./common/"
	});
});

// 记录访问信息到 dm 模块中
srv.ro.get("/myNam/", function (req, res, next) {
	var t = tools.dm.getTls();
	t.qryRo.db.add( req, res, next, null, {
		ip: t.utNode.getClientIp(req),
		tim: t.utTim.getTim()
	}, true );
});

// 返回服务名
srv.ro.get("/myNam/", function (req, res) {
	res.send("Webp");
});

// LZR库文件访问服务
srv.ro.setStaticDir("/myLib/", LZR.curPath);

// 数据库管理模块
tools.dm = require("./DbMgr");
srv.use("/DbMgr/", tools.dm);

// 静态主页设置
srv.ro.setStaticDir("/", "./web");

srv.use("*", function (req, res) {
	res.redirect(tools.mUrl + "Err");
});

// 服务启动
srv.start();
console.log("LZRwebp start " + srv.ip + ":" + srv.port);
