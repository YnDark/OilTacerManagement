//1.导入模块
const express = require('express')
//2.创建服务器
let server = express()

const cors = require('cors')
server.use(cors())
 
const user = require('./api/user.js')

const bodyParser = require('body-parser')
// 以json格式返回出去
server.use(bodyParser.json()) 
server.use(bodyParser.urlencoded({ extended: false }))
//采用设置所有均可访问的方法解决跨域问题
server.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})

server.use('/', user)
 
//3.开启服务器
server.listen(8002, () => {
    console.log('服务器已启动,端口号8002')
})
