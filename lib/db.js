// database model 

var mongoose = require('mongoose')
// local database connection, will need to change if on a different server
var mongoUrl = 'mongodb://localhost/blogdb'

exports.isValidationError = function(err) {
   return ((err.name === 'ValidationError')
           || (err.message.indexOf('ValidationError') !== -1));
};

exports.isDuplicateKeyError = function(err) {
   return (err.message.indexOf('duplicate key') !== -1);
};

exports.connect = function() {
   mongoose.connect(mongoUrl, { safe: true }, function(err) {
      if (err) {
         console.error('database connection failure: \n' + err.stack);
         process.exit(1);
      }
   });
};

