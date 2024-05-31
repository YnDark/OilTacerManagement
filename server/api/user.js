//user.js
const {  
    getAllData,
    insertData,
    updateData,
    deleteData,
    getSegment,
    getDate} = require('../database/api')
const express = require('express');
const db = require('mssql');
const router = express.Router();
 
/* GET home page. */
//获取全部数据
router.get('/info', function (req, res) {
    console.log('hello world');
    getAllData().then(response=>{
        res.send(response);
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});
//获取全部日期
router.get('/date', function (req, res) {
    console.log('getting date');
    getDate().then(response=>{
        res.send(response);
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});
//获取全部段号
router.get('/segment', function (req, res) {
    console.log('getting segment');
    getSegment().then(response=>{
        res.send(response);
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});


const bodyParser=require("body-parser");
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const connection = require('../database/db')

//插入数据
router.post("/insert",urlencodedParser,function(req,res){
    console.log('inserting');
    console.log(req.body);
    const segment = req.body.params.segment;
    const oilCol = req.body.params.OilCol;
    const waterCol = req.body.params.WaterCol;
    const date = req.body.params.Date;
    const waterMess = req.body.params.WaterMess;
    const oilMess = req.body.params.OilMess;
    let year = new Date(date).getFullYear().toString();
    let month = (new Date(date).getMonth() + 1).toString();
    let strDate = new Date(date).getDate().toString();
    let allDate = year+"-"+month+"-"+strDate;
    const obj = {
        segment:segment,
        oilCol:oilCol,
        waterCol:waterCol,
        date:allDate,
        waterMess:waterMess,
        oilMess:oilMess
    }
    console.log(obj)
    console.log(`insert into oildata(WaterCol,oilCol,segment,Date,WaterMess,OilMess) values('${obj.waterCol}','${obj.oilCol}','${obj.segment}','${obj.date}','${obj.waterMess}','${obj.oilMess}')`);
    insertData(obj).then(response=>{
        res.send({
            status:0,
            msg:"请求成功",
            data:req.body
        });
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});

router.post("/delete",urlencodedParser,function(req,res){
    console.log('deleting');
    console.log(req.body);
    const segment = req.body.params.segment;
    const oilCol = req.body.params.OilCol;
    const waterCol = req.body.params.WaterCol;
    const date = req.body.params.Date;
    let year = new Date(date).getFullYear().toString();
    let month = (new Date(date).getMonth() + 1).toString();
    let strDate = new Date(date).getDate().toString();
    let allDate = year+"-"+month+"-"+strDate;
    const obj = {
        segment:segment,
        oilCol:oilCol,
        waterCol:waterCol,
        date:allDate
    }
    console.log(obj)
    deleteData(obj).then(response=>{
        res.send({
            status:0,
            msg:"请求成功",
            data:req.body
        });
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});
router.post("/update",urlencodedParser,function(req,res){
    console.log('update');
    console.log(req.body);
    const segment = req.body.params.segment;
    const oilCol = req.body.params.OilCol;
    const waterCol = req.body.params.WaterCol;
    const date = req.body.params.Date;
    let year = new Date(date).getFullYear().toString();
    let month = (new Date(date).getMonth() + 1).toString();
    let strDate = new Date(date).getDate().toString();
    let allDate = year+"-"+month+"-"+strDate;
    const obj = {
        segment:segment,
        oilCol:oilCol,
        waterCol:waterCol,
        date:allDate
    }
    console.log(obj)
    updateData(obj).then(response=>{
        res.send({
            status:0,
            msg:"请求成功",
            data:req.body
        });
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});
module.exports = router;
