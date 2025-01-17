var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.greeting = "Hi!!!";
  res.render('index', { title: 'Express',  counter:req.session.counter  });
});

/* GET login/registration page. */
router.get('/logreg', function(req, res, next) {
  res.render('logreg',{title: 'Вход', error: null});
  });


  /* POST login/registration page. */
router.post('/logreg', async function(req, res, next) {
   var username = req.body.username
   var password = req.body.password
   var users = await User.find({username: username});
   if (!users.length) {
    //res.send("<h1>Пользователь НЕ найден</h1>");
    var user = new User({username:username,password:password})
        await user.save();
        req.session.user_id = user._id;
        res.redirect('/');
   } else {
    //res.send("<h1>Пользователь найден</h1>");
      var foundUser = users[0];
      if(foundUser.checkPassword(password)){
        req.session.user_id = foundUser._id
        res.redirect('/')
      } else {
        res.render('logreg',{title: 'Вход', error: 'Пароль не верный'});
      }
   }   
});
// router.get('/Get Out', function(req, res, next) 
// {
//     res.render('film', 
//       {
//       title: "Прочь",
//       picture: "images/away.jpg",
//       desc: "Когда герой фильма «Прочь» собрался в поездку, он надеялся на лучшее. Но посещение родового имения девушки, на которое наложено проклятье, оказалось далеко не лучшей идеей и имело очень непредсказуемые последствия."
//       });
// });
    
// router.get('/The Longest Yard', function(req, res, next) 
// {
//     res.render('film', 
//       {
//       title: "Все или ничего",
//       picture: "images/all.jpeg",
//       desc: "Ранее Пол играл в Национальной Футбольной лиге, а теперь попал в тюрьму из-за того, что разъезжал на авто в нетрезвом состоянии. Начальник тюрьмы решает организовать футбольные соревнования и предлагает Полу собрать собственную команду. И если его команда проиграет команде охранников, то срок будет урезан. Сможет ли Кру, привыкший выигрывать, изменить своим принципам и «слить» матч, или же он будет бороться за победу до последнего."
//       });
// });
    
// router.get('/The Professor', function(req, res, next) 
// {
//     res.render('film', 
//       {
//       title: "Во все тяжкое",
//       picture: "images/Professor.jpg",
//       desc: "События фильма \"Во все тяжкое\", рассказывают о жизни профессора колледжа. Он целую осознанную жизнь все делал по правилам, но вот происходит то, что неожиданно он узнает ужасную новость. Оказывается, что врачи поставили ему смертельный диагноз, и у героя осталось совершенно мало времени. Эта информацию поначалу его шокировала, но постепенно он понял, что теперь может делать все, что ему вздумается. Прекрасно понимая, что все ограничения и запреты сняты, он решает оттянуться на полную катушку. В будущем его ждут невероятные приключения, где ему придется сделать все возможное, пытаясь исправить собственное положение. Необходимо насладится последними деньками, и он готов сделать то, что раньше считал неприличным и аморальным. Сможет он порадоваться напоследок, или судьба не даст ему осуществить то, что они уже давно спланировал? "
//       });
// });   

module.exports = router;

