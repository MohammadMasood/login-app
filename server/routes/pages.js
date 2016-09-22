var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.js');

router.post('/contact-us', function(req, res) {
var now = new Date();	
console.log(req.body);
var contact_data=new Contact({ name: req.body.name,subject: req.body.subject,email: req.body.email,mobile_no:req.body.mobile_no,message:req.body.message,created:now  });									

contact_data.save(function (err) {
  if (err) {
		return res.status(500).json({
        err: err
      });
  }
  else {
  	return res.status(200).json({
        status: 'Message Sent Successfully!'
      });
  }
});
								   
});

module.exports = router;