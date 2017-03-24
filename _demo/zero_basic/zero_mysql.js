



var MYSQL_HOST = 'localhost';
var MYSQL_USER = 'root';
var MYSQL_PASS = 'KeYpZrZx';

var MYSQL_PORT = '3306';



var mysql = require('mysql');




// 连接数据�?
exports.connect = function(db_name,fn){
	var connection = mysql.createConnection({
		host 		: MYSQL_HOST,
		user 		: MYSQL_USER,
		password	: MYSQL_PASS,
		port 		: MYSQL_PORT,
		database	: db_name
	});

	connection.connect(function(err){
		if(err){
			// console.log("链接失败");
			// throw(err)
		}else{
			if(fn){fn();}
		}
	});
	return connection;
}



//获取某张表的全部数据
exports.ajax_getAll = function(connect,tableName,callback){
	var  sql = 'SELECT * FROM ' + tableName;
	connect.query(sql, function (err, result) {
	    if(err){
	        console.log('[SELECT ERROR] - ',err.message);
	        return;
	    }       
	    callback(result);
	});
}















// var mysql = require('mysql');
// var connection= mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'',
// 	port:8000,
// 	database:'mydb'
// });

// connection.connect(function(err){
// 	if(err){
// 		console.log("链接失败");
// 		throw(err)
// 	}else{
// 		console.log("链接成功");
// 		connection.query("CREATE TABLE person(id int,user varchar(255),password varchar(255))", function(err,result){
// 			if(err){throw err}else{
// 				console.log("创建表成�?);
// 			}
// 		});
// 	}
// });
