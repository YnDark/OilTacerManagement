//用于操作数据库
//api.js

const connection = require('./db')

//查询
const getAllData = () => {
  return new Promise((resolve, reject) => {
    //第一个参数：sql语句
    //第二个参数：回调函数（err：查询错误，data：查询结果）
    connection.query("select * from oildata",(err,data) => {
        if(err!=null) reject(err);
      resolve(data)
      //reject(err);
    })
  })
}
//添加
const insertData = (param) => {
  return new Promise((resolve,reject) => {
    connection.query(`insert into oildata(WaterCol,oilCol,segment,Date) values(${param.WaterCol},${param.oilCol},${param.segment},${param.Date})`,param,(err,data) => {
      //如果err为null则成功
      resolve(data)
    })
  })
}
//改
const updateData = (param) => {
  return new Promise((resolve,reject) => {
    connection.query(`update account set ${WaterCol = param.WaterCol} ${oilCol = param.WaterCol} where phone = ?`,param,(err,data) => {
      //如果err为null则成功
      resolve(data)
    })
  })
}

//删除
const deleteData = (param) => {
  return new Promise((resolve,reject) => {
    connection.query("delete from account where segment = ?",param,(err,data) => {
      resolve(data)
    })
  })
}
//导出方法，在需要使用到的模块中导入
module.exports = {
  getAllData,
  insertData,
  updateData,
  deleteData
}
