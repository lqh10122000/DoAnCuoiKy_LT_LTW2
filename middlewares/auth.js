const asyncHandler = require('@joellesenne/express-async-handler');
const User = require('../models/user');
const ShowTime = require('../models/show_time');
module.exports = asyncHandler (async function auth (req, res, next){
    res.locals.currentUser = null;
    const { userId } = req.session;     
    if(userId){  
        const user = await User.findById(userId);
        if(user){
            req.currentUser = user;
            res.locals.currentUser = user;        
        }      
        next();                                  
    } else {
        next();
    }
});