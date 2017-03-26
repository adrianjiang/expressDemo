var express = require('express');
var router = express.Router();

var control = require('../controller/control_machine');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('这里是machine');
});


//add
router.get('/add', function(req, res, next) {
    var id = req.query.id;
    if(!id){res.send({state: 3});return;}
        
    var option = req.query.option;
    control.add(id, option, function(result){
        res.send(result);
    });

});
//delete
router.get('/delete', function(req, res, next) {
    var id = req.query.id;
    if(!id){res.send({state: 3});return;}
    
    var machineid = req.query.machineid;
    control.delete(id, machineid, function(result){
        res.send(result);
    });
});

//get all
router.get('/getall', function(req, res, next) {
    var id = req.query.id;
    if(!id){res.send({state: 3});return;}
    control.getall(id, function(result){
        res.send(result);
    });
});
//update
router.get('/set', function(req, res, next) {
    var id = req.query.id;
    if(!id){res.send({state: 3});return;}
    var option = req.query.option;
    console.log('option',option)
    control.set(id, option, function(result){
        res.send(result);
    });
});
//get
router.get('/get', function(req, res, next) {
    var id = req.query.id;
    if(!id){res.send({state: 3});return;}
    var machineid = req.query.machineid;

    control.get(id, machineid, function(result){
        res.send(result);
    });
});
module.exports = router;



