//全局Express框架
/*一奇开源QQ330729121*/
const express = require("express");
const router = express.Router();
module.exports = router;

//加载配置文件
var querystring = require('querystring');
var path = require("path");
var fs = require("fs");

var formidable = require('formidable');
const yiqi = require("../config/yiqi");
const sql = require("../config/conn");
const config = require('../config/config');
const upload = require("../config/qiniu");
//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）

//查询首页相册
router.all("/getAlbum", (req, res) => {

	/*验证参数是否为空*/
	const data = {
		page: req.query.page
	}
	// 定义SQL语句
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	/*结束和开始位置*/
	var end = parseInt(data.page) * 10,
		start = (parseInt(data.page) - 1) * 10;
	const sqlStr =
		"select album_type.*,(select count(album_pic.Id) from album_pic where album_type.Id=album_pic.type_id) num from album_type order by album_type.Id desc limit ?,? ";
	sql.query(sqlStr, [start, end], function(error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});
//查询首页相册里的相片
router.get("/getAlbumList", (req, res) => {

	/*验证参数是否为空*/
	const data = {
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	const sqlStr =
		"select t.Id,t.title,t.info,GROUP_CONCAT(p.img) as imgList from album_type t left join album_pic p on FIND_IN_SET(t.Id,p.type_id) where t.Id=? GROUP BY t.Id;";
	sql.query(sqlStr, data.id, function(error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results[0]));
	});
	//conn.end();
});
//查询相册分类
router.get("/getAlbumClass", (req, res) => {

	const sqlStr = "select * from album_class order by sort";
	sql.query(sqlStr, function(error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
	//conn.end();
});
//查询相册分类的相册
router.get("/getAlbumClassPic", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	const sqlStr =
		"select album_type.*,(select count(album_pic.Id) from album_pic where album_type.Id=album_pic.type_id) num from album_type where album_type.class_id=? order by sort";
	sql.query(sqlStr, data.id, function(error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
	//conn.end();
});
//添加类别
router.all("/addClass", (req, res) => {
	var postData = '';
	// 18. 给req对象注册一个接收数据的事件
	req.on('data', function(chuck) {
		/**data事件详解
		 * 浏览器每发送一次数据包（chuck），该函数会调用一次。
		 * 该函数会调用多次，调用的次数是由数据和网速限制的
		 */
		// 19. 每次发送的都数据都叠加到postData里面
		postData += chuck;
	})
	// 20. 到post请求数据发完了之后会执行一个end事件，这个事件只执行一次
	req.on('end', function() {
		// 21. 此时服务器成功接受了本次post请求的参数
		// post请求最终获取到的数据就是url协议组成结构中的query部分
		//	console.log(postData);
		// 22. 使用querystring模块来解析post请求
		/**
		 * querystring详解
		 * 参数：要解析的字符串
		 * 返回值：解析之后的对象。
		 */
		var postObjc = querystring.parse(postData);
		// 23. 打印出post请求参数，
		/*验证参数是否为空*/
		const data = {
			className: postObjc.className,
			session: postObjc.session
		}
		// 定义SQL语句
		if (yiqi.check(data)) {
			res.end(JSON.stringify(yiqi.Code(1001)));
		}
		yiqi.isLogin(data.session, sql, function(e) {
			if (e != "" && e != undefined && e.length > 0) {

				const sqlStr = "insert into album_class (title,sort)select ?,max(Id) from album_class";
				sql.query(sqlStr, data.className, function(error, results, fields) {
					if (error) throw error;
					var code = yiqi.Code(1024);
					code.Id = results.insertId;
					res.end(JSON.stringify(code));
				});

			} else {
				res.end(JSON.stringify(yiqi.Code(1003)));
			}
		});
		return 0;

	})

});
//添加相册
router.post("/addAlbum", (req, res) => {
	var postData = '';
	req.on('data', function(chuck) {
		postData += chuck;
	})
	req.on('end', function() {
		var postObjc = querystring.parse(postData);
		const data = {
			className: postObjc.className,
			classId: postObjc.classId,
			session: postObjc.session
		}
		if (yiqi.check(data)) {
			res.end(JSON.stringify(yiqi.Code(1001)));
		}
		yiqi.isLogin(data.session, sql, function(e) {
			if (e != "" && e != undefined && e.length > 0) {
				const sqlStr = "insert into album_type (title,info,class_id,sort)select ?,?,?,max(Id) from album_type";
				sql.query(sqlStr, [data.className, postObjc.classInfo, data.classId], function(error, results, fields) {
					if (error) throw error;
					var code = yiqi.Code(1024);
					code.Id = results.insertId;
					res.end(JSON.stringify(code));
				});

			} else {
				res.end(JSON.stringify(yiqi.Code(1003)));
			}
		});
		return 0;
	})
});
//更换类别位置
router.get("/changeClassSort", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		AID: req.query.AID,
		ASORT: req.query.ASORT,
		BID: req.query.BID,
		BSORT: req.query.BSORT,
		session: req.query.session
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"UPDATE album_class SET sort= (case when Id = ? then ? when Id  = ? then ? end) WHERE Id in (?,?)";
			sql.query(sqlStr, [data.AID, data.ASORT, data.BID, data.BSORT, data.AID, data.BID], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
	//conn.end();
});
//更换相册位置
router.get("/changeTypeSort", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		AID: req.query.AID,
		ASORT: req.query.ASORT,
		BID: req.query.BID,
		BSORT: req.query.BSORT,
		session: req.query.session
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"UPDATE album_type SET sort= (case when Id = ? then ? when Id  = ? then ? end) WHERE Id in (?,?)";
			sql.query(sqlStr, [data.AID, data.ASORT, data.BID, data.BSORT, data.AID, data.BID], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
	//conn.end();
});
//保存类别名字
router.get("/saveClass", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		changeName: req.query.changeName,
		session: req.query.session,
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"UPDATE album_class SET title=? where Id=?";
			sql.query(sqlStr, [data.changeName, data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//保存相册信息
router.get("/saveType", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		changeName: req.query.changeName,
		changeInfo: req.query.changeInfo,
		session: req.query.session,
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"UPDATE album_type SET title=?,info=? where Id=?";
			sql.query(sqlStr, [data.changeName, data.changeInfo, data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//删除类别
router.get("/cutClass", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		session: req.query.session,
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"DELETE album_class,album_type from album_class LEFT JOIN album_type ON album_class.Id=album_type.class_id WHERE album_class.Id=?";
			sql.query(sqlStr, [data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//删除相册
router.get("/cutType", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		session: req.query.session,
		id: req.query.id
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"delete from album_type where Id = ?";
			sql.query(sqlStr, [data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//删除照片
router.get("/cutImg", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		session: req.query.session,
		id: req.query.id,
		img:req.query.img,
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"delete from album_pic where img = ? and type_id=?";
			sql.query(sqlStr, [data.img,data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//更新封面
router.get("/setIndexPic", (req, res) => {
	/*验证参数是否为空*/
	const data = {
		session: req.query.session,
		id: req.query.id,
		img:req.query.img,
	}
	if (yiqi.check(data)) {
		res.end(JSON.stringify(yiqi.Code(1001)));
	}
	yiqi.isLogin(data.session, sql, function(e) {
		if (e != "" && e != undefined && e.length > 0) {
			const sqlStr =
				"update album_type set img=? where Id=?";
			sql.query(sqlStr, [data.img,data.id], function(error, results,
				fields) {
				if (error) throw error;
				res.end(JSON.stringify(yiqi.Code(1024)));
			});
		} else {
			res.end(JSON.stringify(yiqi.Code(1003)));
		}
	});
});
//上传图片 本地存储
router.post("/updataPic", (req, res) => {
	var form = new formidable.IncomingForm();
	var uploadDir = path.normalize(__dirname + '/' + "../image");
	form.uploadDir = uploadDir;
	console.log(uploadDir);
	form.parse(req, function(err, fields, files) {
		var oldname = files.file.path;
		var newname = './image/'+files.file.name;
		var session=fields.session,
			id=fields.id;
		fs.rename(oldname, newname, function(err) {
			if (err) console.log(err);
			var imgUrl=newname.replace("./",config.server)
			//upload(files.file.name, newname,function(e){
				if(imgUrl!="" || imgUrl!=undefined){
					var img=imgUrl;
					var code= yiqi.Code(1024);
					code.img=img;
					const data = {
						session: session,
						id: id
					}
					if (yiqi.check(data)) {
						res.end(JSON.stringify(yiqi.Code(1001)));
					}
					yiqi.isLogin(session, sql, function(e) {
						if (e != "" && e != undefined && e.length > 0) {
							const sqlStr =
								"insert into album_pic (img,type_id) values(?,?)";
							sql.query(sqlStr, [img,id], function(error, results,
								fields) {
								if (error) throw error;
								code.Id=results.insertId;
								res.end(JSON.stringify(code));
							});
						} else {
							res.end(JSON.stringify(yiqi.Code(1003)));
						}
					});
					
					
					
				}else{
					res.end(JSON.stringify(yiqi.Code(1004)));
				}
			//});
			
		})
	});
});
//上传图片-七牛云(更安全速度更快)
router.post("/updataPicQiniu", (req, res) => {
	var form = new formidable.IncomingForm();
	var uploadDir = path.normalize(__dirname + '/' + "../image");
	form.uploadDir = uploadDir;
	console.log(uploadDir);
	form.parse(req, function(err, fields, files) {
		var oldname = files.file.path;
		var newname = './image/'+files.file.name;
		var session=fields.session,
			id=fields.id;
		fs.rename(oldname, newname, function(err) {
			if (err) console.log(err);
			upload(files.file.name, newname,function(e){
				if(e.key!="" || e.key!=undefined){
					var img=e.url+e.key;
					var code= yiqi.Code(1024);
					code.img=img;
					const data = {
						session: session,
						id: id
					}
					if (yiqi.check(data)) {
						res.end(JSON.stringify(yiqi.Code(1001)));
					}
					yiqi.isLogin(session, sql, function(e) {
						if (e != "" && e != undefined && e.length > 0) {
							const sqlStr =
								"insert into album_pic (img,type_id) values(?,?)";
							sql.query(sqlStr, [img,id], function(error, results,
								fields) {
								if (error) throw error;
								code.Id=results.insertId;
								res.end(JSON.stringify(code));
							});
						} else {
							res.end(JSON.stringify(yiqi.Code(1003)));
						}
					});
					
					
					
				}else{
					res.end(JSON.stringify(yiqi.Code(1004)));
				}
			});
			
		})
	});
});
//获取banner图
router.get("/getBanner", (req, res) => {
	/*验证参数是否为空*/
	const sqlStr =
		"select * from album_banner";
	sql.query(sqlStr, function(error, results,
		fields) {
		if (error) throw error;
		var imgList=[];
		results.forEach((item,index)=>{
			imgList.push(item.img);
		})
		res.end(JSON.stringify(imgList));
	});
	
});
//获取设置
router.get("/getSet", (req, res) => {
	/*验证参数是否为空*/
	const sqlStr =
		"select * from album_set where Id =1";
	sql.query(sqlStr, function(error, results,
		fields) {
		if (error) throw error;
		
		res.end(JSON.stringify(results[0]));
	});
	
});