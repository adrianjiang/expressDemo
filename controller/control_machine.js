




require('./east-server');



var db = require('./db');
var account = require('../controller/control_account');

var table_name = 'machine';

function create_db(){
    var sql = 'CREATE TABLE `' + table_name;
    sql += '`(';
    sql += '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,';
    sql += '`number` varchar(255),';
    sql += '`name` varchar(255),';
    sql += '`modelnum` varchar(255),';
    sql += '`licensenum` varchar(255),';
    sql += '`user` varchar(255),';
    sql += '`state` varchar(255),';
    sql += '`seat` varchar(255),';
    sql += '`problem` varchar(2048),';
    sql += '`note` varchar(2048),';
    sql += '`pipe` varchar(255)';
    sql += ')ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;';

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
    // console.log('初始化machine')
    mysql_init.machine = true;

    var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='" + table_name + "' ;";

    db.db170325.query(sql,function (err, result) {
        if(err){
            return;
        }    
        // console.log('result',result);   
        if(result.length == 0){//还未创建数据表
            create_db();
        }else{
            
        }
    }); 
}

if(!mysql_init.machine)init();//如果还没有初始化就初始化

function machine_add(data, callback){
  
    var number   = data.number;        
    var name     = data.name;
    var modelnum    = data.modelnum;
    var licensenum  = data.licensenum;
    var user     = data.user; 
    var state    = data.state;  
    var seat     = data.seat; 
    var problem  = data.problem;    
    var note     = data.note; 
    var pipe     = data.pipe; 

    // console.log(name,pass,manage,pn_user,pn_export,pn_machine,pn_root)
    var  userAddSql = 'INSERT INTO '+ table_name +'(number,name,modelnum,licensenum,user,state,seat,problem,note,pipe) VALUES(?,?,?,?,?,?,?,?,?,?)';
    var  userAddSql_Params = [number,name,modelnum,licensenum,user,state,seat,problem,note,pipe];

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
    var  sql = "SELECT * FROM " + table_name + " WHERE id='" + id +"' ";
    db.db170325.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }    
        callback({
            state: 1,
            data: result[0]
        });   
       
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
    account.get_byid(id, function(user){
        if(user.pn_machine == 'true'){
            machine_add(option, function(result){
                callback(result);
            })
        }
    });
   
}
exports.delete = function(id,machineid,callback){


    account.get_byid(id, function(result){

        if(result.pn_machine == 'true'){
            var  userDelSql = "DELETE FROM " + table_name + " WHERE id = '" + machineid + "' ";
            db.db170325.query(userDelSql,function (err, result) {
                if(err){
                  console.log('[DELETE ERROR] - ',err.message);
                  return;
                }   
                console.log(result)
                callback({
                    state: 1
                })    
            });   
        }

    })
}

exports.getall = function(id,callback){

    account.get_byid(id, function(result){

        if(result.pn_export == 'true'){
            var  sql = "SELECT * FROM " + table_name;
            db.db170325.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }       
                callback({
                    state: 1,
                    data: result
                })
            });     
        }

    })
}


exports.get = function(id,machineid,callback){

    console.log(id,machineid)
    account.get_byid(id, function(result){
        var manage = result.manage || '';
        var have_ = manage.split(',').indexOf(machineid);
        console.log('have_',have_);
        if(result.pn_machine == 'true' || have_ >= 0){
            get_byid(machineid, function(result){
                callback(result)
            })
        }

    })
}
exports.set = function(id,option,callback){
    var data = option;

    var machineid   = data.id;        
    var number   = data.number;        
    var name     = data.name;
    var modelnum    = data.modelnum;
    var licensenum  = data.licensenum;
    var user     = data.user; 
    var state    = data.state;  
    var seat     = data.seat; 
    var problem  = data.problem;    
    var note     = data.note; 
    var pipe     = data.pipe; 

    account.get_byid(id, function(result){
        var username = result.name;
        var manage = result.manage || '';
        var have_ = manage.split(',').indexOf(machineid);

        if(have_ > 0)user = username;

        if(result.pn_machine == 'true' || have_ >= 0){
        
            var ModSql = 'UPDATE ' + table_name + ' SET number=?,name=?,modelnum=?,licensenum=?,user=?,state=?,seat=?,problem=?,note=?,pipe=? WHERE id = ?';
            var ModSql_Params = [number,name,modelnum,licensenum,user,state,seat,problem,note,pipe, machineid];
            //改 up
            db.db170325.query(ModSql,ModSql_Params,function (err, result) {
                if(err){
                    console.log('[UPDATE ERROR] - ',err.message);
                    return;
                }     
                callback({
                    state: 1
                })
            }); 
        }

    })
}


