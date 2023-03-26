let passport = require('passport');
const {
  User
} = require('../models');
const login = (req, res, next) => {
  passport.authenticate('google', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('http://localhost:3000')
      // return res.json(user);
    });
  })(req, res, next);
}



const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If user is authenticated, call the next middleware function
    return next();
  }

  // If user is not authenticated, redirect to login page
  res.status(401).json({ error: 'Unauthorized' });
}


module.exports = {
    login,
    logout,
    isAuthenticated
}