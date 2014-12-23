// module dependencies
var express        = require('express')
var app            = express()
var morgan         = require('morgan')
var flash          = require('connect-flash')
var cookieParser   = require('cookie-parser')
var cookieSession  = require('cookie-session')
var bodyParser     = require('body-parser')
var methodOverride = require('method-override')
var errorHandler   = require('errorhandler')
var routes         = require('./routes')
var index          = require('./routes/index')   // doesn't seem to work
var main           = require('./routes/main')
var sessions       = require('./routes/sessions')
var users          = require('./routes/users')
var blogs          = require('./routes/blogs')   
var db             = require('./lib/db')
var responseTime   = require('response-time')
var favicon        = require('serve-favicon')


// view setup
app.set('view engine', 'jade')
app.set('views', './views')
app.locals = require('./helpers/index')
app.locals.title = 'nodejs & expressjs'

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/bower_components'))
app.use(favicon(__dirname + '/public/favicon.ico'))


// enable middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(responseTime())


// add put & delete 
app.use(methodOverride(function(req, res){
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies 
      var method = req.body._method
      delete req.body._method
      return method
   }
}))
app.use(cookieParser())
app.use(cookieSession({
   secret: "n0d3man",
   cookie: {
      maxAge: 360000
   }
}))
app.use(flash())


// dynamic routing
app.get('/', blogs.home)
app.get('/tools', blogs.getRecentBlogs, blogs.tools)                         // show interests page
app.get('/project', blogs.getRecentBlogs, blogs.project)                     // show about page
app.get('/blogs', blogs.getRecentBlogs, blogs.nextBlog, blogs.blogs)         // show main blogs
app.get('/blogs/:slug', blogs.getRecentBlogs, blogs.nextBlog, blogs.show)    // show single blog

// blog manager 
// include requireUserAuth for urls that need login auth
app.get('/blogmgr/list', main.requireUserAuth, blogs.list)                   // get list of blogs
app.get('/blogmgr/new', main.requireUserAuth, blogs.new)                     // to create new blog
app.post('/blogmgr/new', main.requireUserAuth, blogs.create)                 // save new blog
app.get('/blogmgr/edit/:slug', main.requireUserAuth, blogs.edit)             // retrieve existing blog
app.put('/blogmgr/edit/:slug', main.requireUserAuth, blogs.update)           // update existing
app.delete('/blogmgr/:slug', main.requireUserAuth, blogs.destroy)            // delete existing

// create new user
app.get('/users/new', users.new)
app.post('/users', users.create)
// login and logout 
app.get('/sessions/new', sessions.new)
app.post('/sessions', sessions.create)
app.delete('/sessions', sessions.delete)


// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not Found')
   err.status = 404
   next(err)
})

// development error handler
if (app.get('env') === 'development') {
   app.use(errorHandler())
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})


var port = process.env.PORT || 3000
db.connect()
app.listen(port)
console.log('server started on port ' + port)

