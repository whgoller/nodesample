// general routes used to require user authentication 
// or middleware that needs to be reused for different paths

exports.requireUserAuth = function(req, res, next) {
   // redirect user to login page if he's not logged in
   if (!req.session.username) {
      return res.redirect('/sessions/new')
   }

   // needed in layout2 for displaying the logout button
   res.locals.isLoggedIn = true

   next()
}
