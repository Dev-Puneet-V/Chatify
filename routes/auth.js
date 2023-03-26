const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  authController
} = require('../controllers');
const { isAuthenticated } = require('../services/auth.service');
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000')
    // res.json({ success: true });
});

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.json({ success: true });
});


router.post('/logout',isAuthenticated, function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({ success: true });
  });
});

module.exports = router;
