var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/hello1', function (req, res) {
 
//    // 输出 JSON 格式
//    response = {
//        first_name:req.query.first_name,
//        last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })
//-------------------------------------------------------------
// router.get('/jsonp',function(req,res,next){ 
//    res.jsonp({status:'jsonp'});  
// });  
  
// router.get('/json',function(req,res,next){ 
//     res.jsonp({status:'json'});  
// }); 
//---------------------------------------------------------------
module.exports = router;
