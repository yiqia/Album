//全局Express框架
const express = require("express");
const router = express.Router();
module.exports = router;
 
//加载配置文件
const config = require("../config/mysql");
const mysql = require("mysql");
const conn = mysql.createConnection(config);
 
//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
router.all("/select", (req, res) => {
    // 定义SQL语句
    const id = req.body.id || req.query.id;
    const sqlStr = "select * from area " + (id ? "where id = ?" : "");
 
    conn.query(sqlStr, id, (err, result) => {
        if (err) return result.json({code: 404, data: "获取失败"});
        res.json({
            code: 0, data: result
        });
    });
});