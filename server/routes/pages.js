var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Contact = require('../models/contact.js');
var transporter = nodemailer.createTransport('smtps://tractormandi7@gmail.com:common123@smtp.gmail.com');

router.post('/contact-us', function(req, res) {


//End Email 
var now = new Date();	
console.log(req.body);
var contact_data=new Contact({ name: req.body.name,subject: req.body.subject,email: req.body.email,phone_no:req.body.phone_no,message:req.body.message,created:now  });									

contact_data.save(function (err) {
  if (err) {
		return res.status(500).json({
        err: err
      });
  }
  else {
	  
	
	var mailOptions = {
	from: '"Node Mailer" <tractormandi7@gmail.com>', // sender address
	to: 'mohammadmasood01@gmail.com, mohammadmasood01@gmail.com', // list of receivers
	subject: req.body.subject, // Subject line   
	html: '<table width="100%" border="0" cellspacing="4" cellpadding="4"><tr><td>Name</td><td>'+req.body.name+'</td></tr><tr><td>Subject</td><td>'+req.body.subject+'</td></tr><tr><td>Email</td><td>'+req.body.email+'</td></tr><tr><td>Phone No</td><td>'+req.body.phone_no+'</td></tr><tr><td>Message</td><td>'+req.body.message+'</td></tr></table>' // html body
	};
	transporter.sendMail(mailOptions, function(error, info){
	if(error){
		console.log(error);
	}
		console.log('Message sent: ' + info.response);
	});
	
  	return res.status(200).json({
        status: 'Message Sent Successfully!'
      });
  }
});
								   
});

module.exports = router;