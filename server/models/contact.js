// user model
	var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var Contact = new Schema({
  name: String,					  
  subject: String,
  email: String,
  phone_no:String,
  message:String,
  created:Date
});

module.exports = mongoose.model('contacts', Contact);