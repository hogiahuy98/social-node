var User = require('../models/user.model');

module.exports.authCookie = async (req, res, next) => {
    var thisUrl = req.originalUrl.slice(1, req.originalUrl.length);
    if (!req.signedCookies.userID && thisUrl != "login"){
        return res.redirect('/login');
    }
    var user = await User.findOne( {_id: req.signedCookies.userID} );
    if (!user && thisUrl != "login")
        return res.redirect('/login');
    else
        res.locals.userObj = user;
    next();
}

module.exports.blockSomeSite = async (req, res, next) => {
    var user = await User.findOne( {_id: req.signedCookies.userID} );
    if(user)
        return res.redirect('/');
    next();
}