

var express = require('express');
var Url = require("url");
var app = express();



var server = app.listen(8888, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


var ZERO = require('./zero_basic/ZERO');//zero初始化
require('./_A_/_A_basic');

ZERO.init();







app.get('/test', function (req, res) {

    ZERO_mysql.ajax_getAll(DB_zero,'db_project',function(result){
        res.end(JSON.stringify(result));

    });
});

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  


//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})


//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
     res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})





// 书签图标获取接口
// http://127.0.0.1:8000/bookmark/icon?name=t_001.png
app.get('/bookmark/icon', function (req, res) {
    var name = req.query.name;
    console.log("获取图片",name);

    res.sendFile( __dirname + "/public/bookmark_icon/" + name);
});



var Account = require('./Zero_bookmark/Control/account'); 

// 接口-------------------------------------------------


// 账户验证
// http://localhost:8000/account/login?name=adrian&pass=angel

app.get('/account/login', function (req, res) {
    var name = req.query.name;
    var pass = req.query.pass;

    console.log(name,pass);

    // Account.login(name,pass,function(result){
    //     res.end(JSON.stringify(result));
    //     console.log(result);
    // });
    // res.end(JSON.stringify({
    //     mas:'哈哈，' + name + '你登入成功了',
    //     name:name,
    //     pass:pass
    // }));
    var json = {
        mas:'哈哈，' + name + '你登入成功了',
        name:name,
        pass:pass
    }
    // res.json({
    //     mas:'哈哈，' + name + '你登入成功了',
    //     name:name,
    //     pass:pass
    res.end(JSON.stringify(json));
    // })
    // res.end("success_jsonpCallback(" + json + ")");

});

// 添加账户
// http://localhost:8000/account/add?name=adrian&pass=angel
app.get('/account/add', function (req, res) {
    var name = req.query.name;
    var pass = req.query.pass;

    console.log(name,pass);

    Account.add(name,pass,function(result){
        res.end(JSON.stringify(result));
    });
}); 



var Bookmark = require('./Zero_bookmark/Control/bookmark'); 

// 书签数据库初始化
// http://localhost:8000/bookmark/init?id=1

app.get('/bookmark/init', function (req, res) {
    var id = req.query.id;
    // var pass = req.query.pass;

    // console.log(name,pass);

    Bookmark.init(id,function(result){
        res.end(JSON.stringify(result));
    });
}); 


// 添加书签
// http://localhost:8000/bookmark/add?id=1&title=logo&url=&user_name=adrian&user_pass=angel&img_file=123456
app.get('/bookmark/add', function (req, res) {

    var id = req.query.id;
    var title = req.query.title;
    var url = req.query.url;
    var user_name = req.query.user_name;
    var user_pass = req.query.user_pass;
    var img_file = req.query.img;

    var img = _A_.random();

    Bookmark.add(id,title,url,user_name,user_pass,img_file,function(result){
        res.end(JSON.stringify(result));
    });
}); 

// 获取全部书签
// http://localhost:8000/bookmark/getall?id=4
app.get('/bookmark/getall', function (req, res) {

    var id = req.query.id;
    // var title = req.query.title;
    // var url = req.query.url;
    // var user_name = req.query.user_name;
    // var user_pass = req.query.user_pass;
    // var img_file = req.query.img;

    // var img = _A_.random();

    Bookmark.getAll(id,function(result){
        res.end(JSON.stringify(result));
    });
}); 







