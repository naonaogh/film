var express = require('express');
var router = express.Router();
var Film = require('../models/film').film; // Убедитесь, что экспорт модели правильный

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с films');
});

/* Страница фильма */
router.get('/:nick', async function(req, res, next) {
  try {
    // Поиск фильма по уникальному полю `nick`
    const films = await Film.find({ nick: req.params.nick });

    if (!films.length) {
      return next(new Error('Нет такого фильма'));
    }

    const film = films[0];
    res.render('film', {
      title: film.title,
      picture: film.avatar,
      desc: film.desc,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
