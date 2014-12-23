// model/blog.js 
// blog model, blogs stored in database

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// blog schema
var Blog = new Schema({
   author: String,
   title: {
      type: String,
      unique: true
   },
   slug: {
      type: String,
      unique: true
   },
   body: String,
   tags: [String],
   createdOn: { 
      type: Date, 
      'default': Date.now 
   },
   modifiedOn: { 
      type: Date, 
      'default': Date.now 
   }
}, {collection: 'blogs'})


// regex function used to create slug
function slugify(text) {
   return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // replace spaces with -
      .replace(/[^\w\-]+/g, '')    // remove all non-word chars
      .replace(/\-\-+/g, '-')      // replace multiple - with single -
      .replace(/^-+/, '')          // trim - from start of text
      .replace(/-+$/, '');         // trim - from end of text
}

// create slug based on the title
Blog.pre('save', function(next) {
   this.slug = slugify(this.title)
   next()
})


// create the model
module.exports = mongoose.model('Blog', Blog)

