




// var ZERO = require('./zero_basic/ZERO.js');



var _project = {};

function ajax_get_project(){
	_project = {
		a:'a'
	}
}

exports.ajax_get_project = function(){
	console.log('ajax_get_project');
}





var ZERO_mysql = require('./zero_mysql');







// var DB_zero = ZERO_mysql.connect('zero');


    // ZERO_mysql.ajax_getAll(DB_zero,'db_project',function(result){
    //     res.end(JSON.stringify(result));

    // });

var table_init = ['db_account'];

exports.init = function(){

	DB_zero = ZERO_mysql.connect('zero');
	DB_zero_bm = ZERO_mysql.connect('zero_bookmark');
	DB_zero_st = ZERO_mysql.connect('zero_setting');

	// ZERO_mysql.ajax_getAll(DB_zero,'db_project',function(result){

	// 	var bit = false;

	// 	var array = [];

	// 	for(var i = 0; i<table_init; i++){
	// 		var buff = table_init[i];
	// 		var bit = false;;
	// 		for(var j = 0;j<result.length;j++){
	// 			if(buff == result[j].name){
	// 				bit = true;
	// 			} 
	// 		}

	// 		if(!bit){
	// 			array.push(buff);
	// 		}
	// 	}

	// 	if(array.indexOf('db_project') >= 0){
	// 		DB_zero.query("CREATE TABLE db_account(id int,user varchar(20),password varchar(50))", function(err,result){
	// 			if(err){throw err}else{
	// 				console.log("创建表成功");
	// 			}
	// 		});
	// 	}

 //        res.end(JSON.stringify(result));

 //    });
}


