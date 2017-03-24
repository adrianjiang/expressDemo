






// var _password = 'sky';


// var account = require('./account'); 
var fs = require('fs');
// 添加书签

exports.add = function(userID,title,url,user_name,user_pass,img,callback){


	console.log('title',title);

	var imgname = _A_.random();
	var imgdata = img;
  
	var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	fs.writeFile('public/bookmark_icon/' + imgname+".png", dataBuffer, function(err) {
	    if(err){
	      // response.write(err);
	      console.log(err);
	    }else{
	      // response.write("保存成功！");
	      console.log('保存成功！');
	    }
	});



	var  sql = 'INSERT INTO zb_list_' + userID + '(title,url,user_name,user_pass,img) VALUES(?,?,?,?,?)';
	var  sql_params = [title,url,user_name,user_pass,imgname];

	//增 add
	DB_zero_bm.query(sql,sql_params,function (err, result) {
	    if(err){
			console.log('[INSERT ERROR] - ',err.message);
			return;
	    }    
	    console.log(result);   
	    callback({
			state:1,
			information:'添加成功'
		});
	});
}

// 创建数据库
// exports.init = function(userID,callback){

// 	var sql = 'CREATE TABLE zb_list_' + userID;
// 	sql += '(';
// 	sql += '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,';
// 	sql += 'title varchar(255),';
// 	sql += 'url varchar(255),';
// 	sql += 'user_name varchar(255),';
// 	sql += 'user_pass varchar(255),';
// 	sql += 'img varchar';
// 	sql += ')';

// 	console.log('创建表',sql);
// 	DB_zero_bm.query(sql,function(err,result){
// 		// console.log(result);
// 		if(err){
// 			console.log('[INSERT ERROR] - ',err.message);
// 			return;
// 	    }  
// 	    if(callback){
// 		    callback({
// 		    	state: 1,
// 		    	information: '初始化成功'
// 		    });	    	
// 	    }
// 	});
// }
exports.init = function(userID,callback){

	var sql = 'CREATE TABLE `zb_list_' + userID;
	sql += '`(';
	sql += '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,';
	sql += '`title` varchar(255),';
	sql += '`url` varchar(255),';
	sql += '`user_name` varchar(255),';
	sql += '`user_pass` varchar(255),';
	sql += '`img` varchar(50)';
	sql += ')';

	console.log('创建表',sql);
	DB_zero_bm.query(sql,function(err,result){
		// console.log(result);
		if(err){
			console.log('[INSERT ERROR] - ',err.message);
			return;
	    }  
	    if(callback){
		    callback({
		    	state: 1,
		    	information: '初始化成功'
		    });	    	
	    }
	});
}


// 获取全部书签数据
exports.getAll = function(userID,callback){
	var table = 'zb_list_' + userID;
	var  sql = "SELECT * FROM " + table;

	DB_zero_bm.query(sql,function (err, result) {
        if(err){
          	console.log('[SELECT ERROR] - ',err.message);
          	return;
        }       

        // console.log(result);
        callback({
			state: 1,
			data: result
		});

	});		
}



























