











// function Account() { 
	
// var mysql  = require('mysql'); 
// var connection = mysql.createConnection({    
// 	host     : '127.0.0.1',      
// 	user     : 'root',             
// 	password : 'angel',      
// 	port: '3306',                  
// 	database: 'nodejs'
// });

// connection.connect();


var name; 

// var database = 'nodejs';
var table = 'db_account';

var Bookmark = require('./bookmark'); 


function setTid(id,tid){
	var userModSql = 'UPDATE ' + table + ' SET tid = ? WHERE id = ?';
	var userModSql_Params = [tid,id];
	//改 up
	DB_zero.query(userModSql,userModSql_Params,function (err, result) {
	   	if(err){
	        console.log('[UPDATE ERROR] - ',err.message);
	        return;
	   	}       
	  // console.log('----------UPDATE-------------');
	  // console.log('UPDATE affectedRows',result.affectedRows);
	  // console.log('******************************');
	});
}

function getTid(id,callback){
	var  sql = "SELECT * FROM " + table + " WHERE id='" + id + "' ";

	DB_zero.query(sql,function (err, result) {
        if(err){
          	console.log('[SELECT ERROR] - ',err.message);
          	return;
        }       
		if(result.length != 0){//已存在该账号
			// console.log('已存在该账号');
			// if(result[0].tid == tid){
			
			callback({
				state: 1,
				tid: result[0].tid
			});
			
		}else{
			// console.log('用户名或密码错误');
			callback({
				state: 3,
				information:'不存在该账户'
			});
		}
	});		
}


// 门禁
exports.entrance = function(id,tid,success,fail){
	getTid(id,function(result){
		if(result.state == 1){
			if(result.tid == tid){
				// console.log('允许通行');
				success({
					state: 1,
					information: '放行'
				});
			}else{
				fail({
					state: 3,
					information: 'tid已过期'
				});
			}			
		}else{
			fail({
				state: 2,
				information: '不存在该id'
			});
		}
	});
}


// http://localhost:8000/account/login?name=adrian&pass=angel

exports.login = function(name,pass,callback){
	var  sql = "SELECT * FROM " + table + " WHERE name='" + name + "' ";

	DB_zero.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }       
		if(result.length != 0){//已存在该账号
			console.log('已存在该账号');
			if(result[0].pass == pass){
				var _id = result[0].id;
				var _tid = _A_.random();//临时ID，目前作为密码
				callback({
					state: 1,
					id: _id,
					tid: _tid,
					information:'登入成功'
				});
				setTid(_id,_tid);
			}else{
				callback({
					state: 2,
					information:'密码错误'
				});
			}
			
		}else{
			console.log('用户名或密码错误');
			callback({
				state: 3,
				information:'不存在该账户'
			});
		}
	});		
}

// http://localhost:8000/account/add?name=adrian&pass=angel
exports.add = function(name,pass,callback){

	var  sql = "SELECT * FROM " + table + " WHERE name='" + name + "' ";
	//查 query
	DB_zero.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }       
		if(result.length != 0){//已存在该账号
			console.log('已存在该账号');
			callback({
				state:2,
				information:'已存在该账号'
			});
		}else{
			console.log('用户名合法，开始创建');
			// var password = _A_.md5(pass);
			var  userAddSql = 'INSERT INTO db_account(name,pass) VALUES(?,?)';
			var  userAddSql_Params = [name, pass];

			//增 add
			DB_zero.query(userAddSql,userAddSql_Params,function (err, result) {
			    if(err){
					console.log('[INSERT ERROR] - ',err.message);
					return;
			    }    
			    console.log(result);   
			    callback({
					state:1,
					information:'添加成功'
				});

			    Bookmark.init(result.insertId);//创建用户书签表


			});
		}
	});		
}

















// module.exports = Account;



// 创建账户表
// CREATE TABLE `nodejs`.`db_account` (
//   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
//   `name` VARCHAR( 20 ) NOT NULL ,
//   `pass` VARCHAR( 20 ) NOT NULL 
// ) ENGINE = MYISAM ;





