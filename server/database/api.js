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
    connection.query(`insert into oildata(WaterCol,oilCol,segment,Date,WaterMess,OilMess) values('${obj.waterCol}','${obj.oilCol}','${obj.segment}','${obj.date}','${obj.waterMess}','${obj.oilMess}')`,(err,data) => {
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
    connection.query(`update segment_data set segment_name = '${obj.segment_name}',segment_number = ${obj.segment_number},oil_all = ${obj.oil_all},water_all = ${obj.water_all},oil_effective_content = ${obj.oil_effective_content},water_effective_content = ${obj.water_effective_content}where segment_number = ${obj.segment_number}`,(err,data) => {
      if(err!=null) reject(err);
      resolve(data)
    })
  })
}
//删除某段
const deleteSegment = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`DELETE oildata FROM oildata WHERE oildata.segment = ${obj.segment_number}`,(err,data) => {
      if(err!=null) reject(err);
        resolve(data)
    })
    connection.query(`DELETE segment_data FROM segment_data WHERE segment_data.segment_number = ${obj.segment_number}`,(err,data) => {
      if(err!=null) reject(err);
        resolve(data)
    })
  })
}
//添加段
const addSegment = (obj) => {
  return new Promise((resolve,reject) => {
    connection.query(`insert into segment_data (segment_number,segment_name,oil_all,water_all,oil_effective_content,water_effective_content) values (${obj.segment_number},${obj.segment_name},${obj.oil_all},${obj.water_all},${obj.oil_effective_content},${obj.water_effective_content})`,(err,data) => {
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
  updateSegmentData,
  deleteSegment,
  addSegment
}
