var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');
var account = require('./routes/account');



var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/hello', hello);
app.use('/account', account);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//允许跨域

// --------------------------------------------------------------------
// app.use(express.static('public'));
// app.get('/process_get', function (req, res) {
 
//    // 输出 JSON 格式
//    response = {
//        first_name:req.query.first_name,
//        last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// // const api = require('./routes/api');

// // router.use('/api', api.routes(), api.allowedMethods());
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// // 网站首页接受 POST 请求
// app.post('/', function (req, res) {
//   res.send('Got a POST request');
// });

// // /user 节点接受 PUT 请求
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// });

// // /user 节点接受 DELETE 请求
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user');
// });

module.exports = app;
