var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('这里是hello');
  // res.end(JSON.stringify({name:'addfxgjghjrian',pass:'hell45300o'}));
});
router.get('/adrian', function(req, res, next) {
	// console.log(req,res,next)
  // res.send('hello  adrian');
  res.end(JSON.stringify({name:'addfxgjghjrian',pass:'hell45300o'}));
	console.log(req.query.id)  
    console.log(req.query.title);  
    console.log(req.query.content);  
    var a={  
      id:req.query.id,  
      title:req.query.title  
    };  
    // res.json(a);  
     // res.send('GET request to homepage');
	// var ajaxTest={
	// 	tips:"you are not alone"
	// };
	// res.send(ajaxTest);
});

module.exports = router;


