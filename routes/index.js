var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/horrors', function(req, res, next) {
  res.send("<h1>Ужасы - фильмы</h1>")
  });

router.get('/comedy', function(req, res, next) {
    res.send("<h1>Комедии - фильмы</h1>")
    });
    
router.get('/ ', function(req, res, next) {
  res.send("<h1>Драмы - фильмы</h1>")
  });
    

module.exports = router;
