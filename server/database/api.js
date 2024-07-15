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
//查询所有日期
const getDate = () => {
  return new Promise((resolve, reject) => {
    //第一个参数：sql语句
    //第二个参数：回调函数（err：查询错误，data：查询结果）
    connection.query("select distinct Date from oildata order by Date",(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
      //reject(err);
    })
  })
}
//查询所有段号
const getSegment = () => {
  return new Promise((resolve, reject) => {
    //第一个参数：sql语句
    //第二个参数：回调函数（err：查询错误，data：查询结果）
    connection.query("select distinct segment from oildata order by segment",(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
      //reject(err);
    })
  })
}
//添加
const insertData = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`insert into oildata(WaterCol,oilCol,segment,Date,WaterMess,OilMess,OilName) values('${obj.waterCol}','${obj.oilCol}','${obj.segment}','${obj.date}','${obj.waterMess}','${obj.oilMess}','${obj.oilName}')`,(err,data) => {
      //如果err为null则成功
      if(err!=null) reject(err);
      resolve(data)
    })
})
}
//改
const updateData = (param) => {
  return new Promise((resolve,reject) => {
    connection.query(`update oildata set WaterCol = ${param.WaterCol}, OilCol = ${param.OilCol}, OilMess = ${param.OilMess},WaterMess = ${param.WaterMess},  where segment = '${param.segment}' AND Date = '${param.date}' `,(err,data) => {
      //如果err为null则成功
      if(err!=null) reject(err);
      resolve(data)
    })
  })
}
//删除
const deleteData = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`delete from oildata where segment = '${obj.segment}' AND Date = '${obj.date}'`,(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
    })
  })
}
//获取段信息
const selectSegmentData = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`select * from segment_data`,(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
    })
  })
}
//更新段信息
const updateSegmentData = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`update segmet_data as s oildata as o set s.segment_name = ${obj.segment_name},s.segment_number = ${obj.segment_number}
                      ,s.oil_all = ${obj.oil_all},s.water_all = ${obj.water_all},o.segment = ${obj.segment} where ${obj.segment_name} = s.segment_name and ${obj.segment_name} = o.segment`,(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
    })
  })
}
//导出方法，在需要使用到的模块中导入
module.exports = {
  getAllData,
  insertData,
  updateData,
  deleteData,
  getDate,
  getSegment,
  selectSegmentData,
  updateSegmentData
}
