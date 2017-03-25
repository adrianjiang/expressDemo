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
    if(!id)res.send({
        state: 3
    });
    var option = req.query.option;
    control.add(id, option, function(result){
        res.send(result);
    });

});
//delete
router.get('/delete', function(req, res, next) {
    var id = req.query.id;
    if(!id)res.send({
        state: 3
    });
    var name = req.query.name;
    control.delete(id, name, function(result){
        res.send(result);
    });
});

//get all
router.get('/getall', function(req, res, next) {
    var id = req.query.id;
    if(!id)res.send({
        state: 3
    });
    control.getall(id, function(result){
        res.send(result);
    });
});
//update
router.get('/update', function(req, res, next) {
    var id = req.query.id;
    if(!id)res.send({
        state: 3
    });
    var pass = req.query.pass;

    control.repass(id, pass, function(result){
        res.send(result);
    });
});
//get
router.get('/get', function(req, res, next) {
    var id = req.query.id;
    if(!id)res.send({
        state: 3
    });
    var name = req.query.name;

    control.repass(id, name, function(result){
        res.send(result);
    });
});
//get all
router.get('/getall', function(req, res, next) {
    var id = req.query.id;
    if(!id)res.send({
        state: 3
    });
    var name = req.query.name;

    control.repass(id, name, function(result){
        res.send(result);
    });
});
module.exports = router;

