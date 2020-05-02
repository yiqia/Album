//全局Express框架
const express = require("express");
const router = express.Router();
module.exports = router;
 
//加载配置文件
const yiqi = require("../config/yiqi");
const sql = require("../config/conn");
 
 /*MD5*/
var md5 = require('md5-node');
//随机数
var random = require('string-random');
 
router.get("/login", (req, res) => {
	/*验证参数是否为空*/
	const data={
		user:req.query.user,
		pass:req.query.pass
	}
	data.pass=md5(data.pass);
	if(yiqi.check(data)){
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
    const sqlStr = "select * from album_user where username=? and password=?";
	console.log(sqlStr);
    sql.query(sqlStr,[data.user,data.pass],function (error, results, fields) {
  	  if (error) throw error;
		if(results==""){
			res.end(JSON.stringify(yiqi.Code(1002)));
		}else{
			const rom=md5(random(32)+new Date().getTime())
			const updata = "update album_user set `session`=? where username=?";
			sql.query(updata,[rom,data.user],function (err, resul, fields) {
				if (err) throw err;
				var code=yiqi.Code(1024);
				code.session=rom;
				res.end(JSON.stringify(code));
			});
		}
  			
  	});
	//conn.end();
});