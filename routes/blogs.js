// routes/blogs.js  
// blog routes -- controller to perform blog crud functions

var Blog = require('../models/blog')
var db = require('../lib/db')

// home page
exports.home = function(req, res) {
   Blog.findOne().sort('-createdOn').exec(function (err, blog) {
      if (err) return console.error(err)
      res.render('index', { blog : blog })
   })
}

// tools used page
exports.tools = function(req, res) { 
   res.render('tools', { blogList : req.blogs }) 
}

// project description page
exports.project = function(req, res) { 
   res.render('project', { blogList : req.blogs }) 
}

// main blog articles page
exports.blogs = function(req, res) {
   Blog.findOne().sort('-createdOn').exec(function (err, blog) {
      if (err) return console.error(err)
      res.render('blogs', { blog : blog, blogList : req.blogs, nextBlog : req.nextBlog })
   })
}

// display individual blog
exports.show = function(req, res) {
   Blog.findOne({'slug': req.param('slug')}, function (err, blog) {
      if (err) return console.error(err)
      res.render('show', { blog : blog, blogList : req.blogs, nextBlog : req.nextBlog })
   })
}

// display blog list table
exports.blogtable = function(req, res, next) {
   Blog.find({})
      .sort('-createdOn')
      .exec(function(err, blogs) {
      if (!err) {
         res.render('blogtable', { blogs : blogs, blogList : req.blogs })
      } else {
         console.error(err)
      }
   })
}

// get next blog
exports.nextBlog = function(req, res, next) {
   var promise
   if(req.params.slug) {
       promise = Blog.findOne().where({slug: req.params.slug }).exec()
   }
   else {
       promise = Blog.findOne().sort('-createdOn').exec()     // could optimize with a find and .limit(2)
   }
   promise.then(function(blog) {
      Blog.findOne().sort('-createdOn').lt('createdOn', blog.createdOn).exec().then(function(nextBlog) {
         req.nextBlog = nextBlog
         next()
      })
   })
}

// get list of recent blogs
exports.getRecentBlogs = function(req, res, next) {
   return Blog.find({})
      .sort('-createdOn')
      .select('slug title')
      .limit(10)
      .exec()
      .then(function(blogs) {
         req.blogs = blogs
         next()
      })
}

// blog list page
exports.list = function(req, res) {
   Blog.find({})
      .sort('-createdOn')
      .exec(function(err, blogs) {
      if (!err) {
         res.render('list', {
            username : req.session.username,
            blogs : blogs
         })
      } else {
         console.error(err)
      }
   })
}

// go to edit view to create a new blog
exports.new = function(req, res) {
   res.render('edit', {
      username : req.session.username
   })
}

// save new blog 
exports.create = function(req, res) {
   Blog.create({ 
      author: req.session.username,
      title: req.param('title'),
      slug: this.slug,
      body: req.param('body'), 
      tags: req.param(['tags'])
   }, function(err, blog) {
      if(!err) {
         console.log('blog was saved: ' + blog.title)
         res.redirect('list')
      } else {
         console.error(err)
      }
   })
}

// open existing blog to edit 
exports.edit = function(req, res) {
   Blog.findOne({'slug': req.param('slug')}, function (err, blog) {
      if (err) return console.error(err)
      res.render('edit', {
         username : req.session.username,
         blog : blog
      })
   })
}

// update an existing blog
exports.update = function(req, res) {
   Blog.update({'slug': req.param('slug')}, {
      author : req.session.username,
      title : req.param('title'),
      tags : req.param('tags'),
      body : req.param('body'),
      created: req.param('createdOn'),          // not updating the date yet
      $currentDate : {modifiedOn : true}
   }, function (err, blog) {
      if (err) return console.error(err)
      res.redirect('/blogmgr/list')
   })
}

// delete an existing blog 
exports.destroy = function(req, res, next) {
   Blog.remove({'slug': req.param('slug')}, function (err, blogs) {
      if (err) return console.error(err)
      res.redirect('list')
   })
}

