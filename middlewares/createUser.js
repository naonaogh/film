var User = require("../models/user").User;
// module.exports = async function(req,res,next){
// res.locals.user = null
// var users = await User.findById(req.session.user_id);
// if (users.length != 0) {
// res.locals.user = users[0];
// }
// next();
// }
module.exports = async function (req, res, next) {
    res.locals.user = null;
    try {
        var user = await User.findById(req.session.user_id); // findById возвращает объект или null
        if (user) {
            res.locals.user = user;
        }
        next();
    } catch (err) {
        console.error('Ошибка при поиске пользователя:', err);
        next(err); // Передаем ошибку в обработчик ошибок
    }
};
