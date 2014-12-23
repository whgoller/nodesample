// routes/sessions.js
// routing for sessions controller

var User = require('../models/user')

// renders the login page
exports.new = function(req, res, next) {
   res.render('sessions/new', {
      info: req.flash('info')[0],
      error: req.flash('error')[0]
   })
}

// handle user authentication
exports.create = function(req, res, next) {
   User.authenticate(req.body.username, req.body.password, function(err, userData) {
      if (err) { return next(err) }

      if (userData !== false) {
         req.session.username = userData.username
         req.session.userId = userData._id
         res.redirect('/blogmgr/list')
      } else {
         req.flash('error', 'Bad username/password')
         res.redirect('/sessions/new')
      }
   })
}

// signs out user
exports.delete = function(req, res, next) {
   delete req.session.username
   delete req.session.userId
   req.flash('info', 'You have successfully logged out')
   res.redirect('/sessions/new')
}
