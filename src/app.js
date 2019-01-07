var express = require('express');
var bodyParser = require('body-parser');//用于获取req.body的值
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: true}));
var db = require('./mysql');
var $sql = db.connection();

//解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200); 
    } else { 
        next(); 
    }
});

app.get('/getAllData',function(req,res){
    db.query($sql,'select * from base_info',function(result){
        var json = {
            code:0,
            data:result
        };
        res.send(json);
        console.log(json);
    })
})

app.post('/postPerfData',function(req,res){
	var params = req.body;
    var insertSql = "insert into base_info(http_connect_time,domain_lookup_time,request_time,white_screen_time,first_screen_time,ready_time,allload_time,mobile,`now_time`) values (?,?,?,?,?,?,?,?,?)";
    db.insert($sql,insertSql,[
        params.httpConnectTime,
        params.domainLookupTime,
        params.requestTime,
        params.whiteScreenTime,
        params.firstScreenTime,
        params.readyTime,
        params.allloadTime,
        params.mobile,
        params.nowTime
    ],function(result){
        console.log(result);
    })
})
var server = app.listen(9000,function(){
	var host = server.address().address;
	var port = server.address().address;
	console.log('address ',host,':',port);
})
