// routes/users.js 
// routing for user controller 

var User = require('../models/user')
var db = require('../lib/db')

// display the user registration page
exports.new = function(req, res, next) {
   res.render('users/new', {
      error: req.flash('error')[0]
   })
}

// create a user 
exports.create = function(req, res, next) {
   var user = new User({ username: req.body.username })

   user.saveWithPassword(req.body.password, function(err) {
      if (err) {
         if (db.isValidationError(err)) {
            req.flash('error', 'Invalid username/password')
            return res.redirect('/users/new')
         } else if (db.isDuplicateKeyError(err)) {
            req.flash('error', 'Username already exists')
            return res.redirect('/users/new')
         } else {
            return next(err)
         }
      }

      req.flash('info', 'Username created, you can now log in!')
      res.redirect('/sessions/new')
   })
}
