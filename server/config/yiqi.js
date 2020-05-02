
module.exports={
	/*
		功能：查看对象是否有空的属性
		参数：对象
		返回值：布尔
	*/
	check(e){
		let key=Object.keys(e);
		let isHas=key.some(function(item,index){
			return e[item]=="" || e[item]==undefined;
		})
		return isHas;
	},
	/*
		功能：返回状态码
		参数：对象
		返回值：布尔
	*/
   Code(e){
	   let code={
		   1001:{
			   "code":1001,
			   "msg":"参数为空"
		   },
		   1002:{
			   "code":1002,
			   "msg":"登录失败"
		   },
		   1003:{
			   "code":1003,
			   "msg":"登录已过期,请重新登录"
		   },
		   1004:{
		   			   "code":1004,
		   			   "msg":"上传失败，重新试试"
		   },
		   1024:{
			   "code":1024,
			   "msg":"请求成功"
		   }
		   
	   }
	   return code[e];
   },
   isLogin(e,sql,resolve){
	   const sqlStr = "select * from album_user where session=?";
	  sql.query(sqlStr,e,function (error, results, fields) {
	    if (error) throw error;
	  		resolve(results);
	  });
   }
   
	
	
};