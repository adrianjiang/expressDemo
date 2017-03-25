




require('./east-server');



var db = require('./db');
var account = require('../controller/control_account');

var table_name = 'machine';

function create_db(){
    var sql = 'CREATE TABLE `user';
    sql += '`(';
    sql += '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,';
    sql += '`number` varchar(255),';
    sql += '`name` varchar(255),';
    sql += '`modelnum` varchar(255),';
    sql += '`licensenum` varchar(255),';
    sql += '`user` varchar(255),';
    sql += '`state` varchar(255),';
    sql += '`problem varchar(5000),';
    sql += '`note` varchar(5000),';
    sql += '`pipe` varchar(255)';
    sql += ')';

    // console.log('创建数据表',sql);

    db.db170325.query(sql, function(err,result){
        if(err){
            console.log('创建machine数据表失败 - ',err.message);
            return;
        }  
        console.log('*****创建machine数据表成功');
    });
}

//检测user数据表是否存在
function init(){
    mysql_init.machine = true;

    var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='machine' ;";

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

if(!mysql_init.machine)init();//如果还没有初始化就初始化

function machine_add(data, callback){
  
    var number   = data.number;        
    var name     = data.name;
    var model    = data.model;
    var license  = data.license;
    var user     = data.user; 
    var state    = data.this.state;  
    var seat     = data.seat; 
    var problem  = data.problem;    
    var note     = data.note; 
    var pipe     = data.pipe; 

    // console.log(name,pass,manage,pn_user,pn_export,pn_machine,pn_root)
    var  userAddSql = 'INSERT INTO user(number,name,model,license,user,state,seat,problem,note,pipe) VALUES(?,?,?,?,?,?,?,?,?,?)';
    var  userAddSql_Params = [number,name,model,license,user,state,seat,problem,note,pipe];

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

function get_byid(id, callback){
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
function get_byname(name, callback){
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


exports.get = function(id,name,callback){


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


