// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = require('bluebird');

var User = new Schema({
  name: String,					  
  username: String,
  password: String,
  email:String,
  mobile_no:String,
  created:Date
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);