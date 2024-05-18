//用于连接数据库

const mysql = require('mysql')
const config = require('./config').db
//连接数据库
module.exports = mysql.createPool(config)
