

require('./east-server');
E.set('pass','angel');

const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASS = 'angel';
const MYSQL_PORT = '3306';



const mysql = require('mysql');

mysql_init = {};




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
			console.log('mysql连接错误')
		}else{
			if(fn){fn();}
		}
	});
	return connection;
}

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


