var User = require("../models/user").User;
module.exports = async function(req,res,next){
res.locals.user = null
var users = await User.findById(req.session.user_id);
if (users.length != 0) {
res.locals.user = users[0];
}
next();
}
