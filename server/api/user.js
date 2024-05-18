//user.js
const {  
    getAllData,
    insertData,
    updateData,
    deleteData} = require('../database/api')
const express = require('express');
const db = require('mssql');
const router = express.Router();
 
/* GET home page. */
router.get('/info', function (req, res) {
    console.log('hello world');
    getAllData().then(response=>{
        res.send(response);
    }).catch(err=>{                                                                                                                                                                                                                                                                                                                                                                                                                 
        res.send(err);
        console.log(err);
    });
});


const bodyParser=require("body-parser");
const { response } = require('express');
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/info",urlencodedParser,function(req,res){
    console.log('hello post');
	res.send(req.body);
});
module.exports = router;
