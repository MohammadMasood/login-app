var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');


router.post('/register', function(req, res) {
	var now = new Date();							  
  User.register(new User({ username: req.body.username , email: 'masood@gmail.com',created:now  }),
    req.body.password, function(err, account) {
    if (err) {
		//console.log(err.message);
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  
  res.status(200).json({
    status: true
  });
  console.log("Hello");
});


module.exports = router;