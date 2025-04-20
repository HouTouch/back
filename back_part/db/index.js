//导入数据库
const mysql = require('mysql');

//创建数据库连接池
const db = mysql.createPool({
    host: 'localhost',
    user: 'hlm',
    password: 'Hlm2002070301.',
    database: 'back_system'
})
//暴露数据库
module.exports = db;