




require('./east-server');



var db = require('./db');

var table_name = 'user';

function create_db(){
	var sql = 'CREATE TABLE `user';
	sql += '`(';
	sql += '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,';
	sql += '`name` varchar(255),';
	sql += '`pass` varchar(255),';
	sql += '`manage` varchar(4000),';
	sql += '`pn_user` varchar(10),';
	sql += '`pn_export` varchar(10),';
	sql += '`pn_machine` varchar(10),';
	sql += '`pn_root` varchar(10)';
	sql += ')';

	// console.log('创建数据表',sql);

	db.db170325.query(sql, function(err,result){
		if(err){
			console.log('创建user数据表失败 - ',err.message);
			return;
	    }  
	    user_add({
	    	name : 'root',
			pass : E.md5('root'),
			manage : 'all',
			pn_user : 'true',
			pn_export : 'true',
			pn_machine : 'true',
			pn_root : 'true'
	    });

	    console.log('*****创建user数据表成功');
	});
}

//检测user数据表是否存在
function init(){
	mysql_init.user = true;

	var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='user' ;";

	db.db170325.query(sql,function (err, result) {
        if(err){
          	return;
        }    
        // console.log('result',result.length);   
		if(result.length == 1){//还未创建数据表
			create_db();
		}else{
			
		}
	});	
}

if(!mysql_init.user)init();//如果还没有初始化就初始化
function user_add(data, callback){
	var name = data.name,
		pass = data.pass,
		manage = data.manage || '',
		pn_user = data.pn_user || 'false',
		pn_export = data.pn_export || 'false',
		pn_machine = data.pn_machine || 'false',
		pn_root = data.pn_root || 'false';
	// console.log(name,pass,manage,pn_user,pn_export,pn_machine,pn_root)
	var  userAddSql = 'INSERT INTO user(name,pass,manage,pn_user,pn_export,pn_machine,pn_root) VALUES(?,?,?,?,?,?,?)';
	var  userAddSql_Params = [name, pass, manage, pn_user, pn_export, pn_machine, pn_root];

	//增 add
	db.db170325.query(userAddSql, userAddSql_Params, function (err, result) {
	    if(err){
			console.log('[INSERT ERROR] - ',err.message);
			return;
	    }    
	    // console.log(result);  
	    if(callback) 
	    callback({
			state:1,
			information:'添加成功'
		});
	});
}

function user_get_byid(id, callback){
	var  sql = "SELECT * FROM " + table_name + " WHERE id='" + E.decrypt(id,E.get('pass')) + "' ";
	db.db170325.query(sql,function (err, result) {
        if(err){
          	console.log('[SELECT ERROR] - ',err.message);
          	return;
        }       
		if(result.length == 0){//已存在该账号
			callback({
				state: 2,
				information:'不存在该账户'
			});
		}else{
			callback({
				state: 1,
				data: result[0]
			});
		}
	});		
}
function user_get_byname(name, callback){
	var  sql = "SELECT * FROM " + table_name + " WHERE name='" + name + "' ";
	db.db170325.query(sql,function (err, result) {
        if(err){
          	console.log('[SELECT ERROR] - ',err.message);
          	return;
        }       
		if(result.length == 0){//已存在该账号
			callback({
				state: 2,
				information:'不存在该账户'
			});
		}else{
			callback({
				state: 1,
				data: result[0]
			});
		}
	});		
}


// http://localhost:8000/account/login?name=adrian&pass=angel

exports.login = function(name, pass, callback){
	var  sql = "SELECT * FROM " + table_name + " WHERE name='" + name + "' ";

	db.db170325.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }       
		if(result.length != 0){//

			if(result[0].pass == pass){
				var _id = E.encrypt(result[0].id + '', E.get('pass'));
				var data = result[0];
				data.id = _id;
				delete data.pass;
				// console.log(result[0].id,_id)
				callback({
					state: 1,
					data: data,
					information:'登入成功'
				});
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

exports.add = function(id,option,callback){

	user_get_byid(id, function(result){
		if(result.state != 1){
			callback({state: 3, info: '您没有权限'});//有非法操作，警报
			return;		
		}
		if(result.data.pn_user == 'true'){
			var  sql = "SELECT * FROM " + table_name + " WHERE name='" + option.name + "' ";
			//查 query
			db.db170325.query(sql,function (err, result) {
		        if(err){
		          console.log('[ERROR] - ',err.message);
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
			    	user_add(option, function(){
				    	callback({
				    		state: 1
				    	});			    		
			    	});

				}
			});		
		}
	})
}
exports.delete = function(id,name,callback){


	user_get_byid(id, function(result){
		if(result.state != 1){
			callback({state: 3, info: '您没有权限'});//有非法操作，警报
			return;		
		}
		if(result.data.pn_user == 'true'){
			var  userDelSql = "DELETE FROM " + table_name + " WHERE name = '" + name + "' ";
			db.db170325.query(userDelSql,function (err, result) {
		        if(err){
		          console.log('[DELETE ERROR] - ',err.message);
		          return;
		        }   
		        callback({
		        	state: 1
		        })    
			});	
		}
	})
}

exports.getall = function(id,callback){


	user_get_byid(id, function(result){
		if(result.state != 1){
			callback({state: 3, info: '您没有权限'});//有非法操作，警报
			return;		
		}
		if(result.data.pn_user == 'true'){
			var  sql = "SELECT * FROM " + table_name;
			db.db170325.query(sql,function (err, result) {
		        if(err){
		          	console.log('[SELECT ERROR] - ',err.message);
		          	return;
		        }       
		        var rn = [];
		        for(var i = 0; i < result.length; i++){
		        	var buff = result[i];
		        	if(buff.name != 'root'){
		        		delete buff.pass;
		        		delete buff.id;

		        		rn.push(buff);
		        	}
		        }
				callback({
					state: 1,
					data: rn
				})
			});		
		}

	})
}


exports.repass = function(id, pass, callback){
	var userModSql = 'UPDATE ' + table_name + ' SET pass = ? WHERE id = ?';
	var userModSql_Params = [pass, E.decrypt(id,E.get('pass'))];
	//改 up
	db.db170325.query(userModSql,userModSql_Params,function (err, result) {
	   	if(err){
	        console.log('[UPDATE ERROR] - ',err.message);
	        return;
	   	}     
	   	callback({
	   		state: 1
	   	})
	});		
}

exports.getuser = function(id,name,callback){


	user_get_byid(id, function(result){
		if(result.state != 1){
			callback({state: 3, info: '您没有权限'});//有非法操作，警报
			return;		
		}
		if(result.data.pn_user == 'true'){
			user_get_byname(name, function(result){
				callback(result);
			})
		}

	})
}


