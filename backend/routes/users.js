var express = require('express');
var generateJWTToken = require('../utils/authUtils').generateJWTToken;
var urlCrypt = require('url-crypt')('~{ry*I)44==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
var router = express.Router();

var crypto = require('crypto');
const nodemailer = require("nodemailer");



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login/', (req, res, next) => {
  console.log(req.body)
  // var data = JSON.parse(req.body);
  
  // console.log(data);
  var email = req.body.email;
  var password = req.body.password;
  var hashed_password = crypto.createHash('sha256').update(password).digest('hex');

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://TechShop-Website:130795mrS@techshop-cluster.adibf.mongodb.net/TechShop?retryWrites=true&w=majority";

  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err) console.log(err);
    var dbo = db.db("TechShop");

    dbo.collection("TechShop_Collection").findOne({ email: email },{ projection: { _id: 0, email: 1, password: 1, first_name: 1, last_name: 1 } }, function(e, result) {
      console.log(result)
      if (e) console.log(e);
      if(result.password === hashed_password){
        var user_info = {
          email: email,
          password: hashed_password,
        };
        res.status(200).json({token: generateJWTToken(user_info), user: { first_name: result.first_name, last_name: result.last_name }});
      } else{
        res.status(406).json({error: 'Cannot login with provided credentials'})
      }
      db.close();
    });
  });
});



//save the url-crypt in the database and only after verification insert the user to the DB
router.post('/register/', (req, res, next) => {
  console.log(req.body)
  // var data = JSON.parse(req.body);
  

  // console.log(data);
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var password1 = req.body.password1;
  var password2 = req.body.password2;

  //check if user exists...
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://TechShop-Website:130795mrS@techshop-cluster.adibf.mongodb.net/TechShop?retryWrites=true&w=majority";

  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err){ 
      console.log(err);
      return res.status(500).json({error: `Mongo Error: ${err}`})
    }
    var dbo = db.db("TechShop");
    var query = { email: email}
    
    dbo.collection("TechShop_Collection").findOne(query, function(e, result) {
      if (e) console.log(e);
      if(result){
        return res.status(403).json({error: 'User already exists'});
        console.log('here');
      }
      db.close();
    });
  });
  console.log('here');
  //input validation...
  if(password1 !== password2){
    return res.status(403).json({error: 'Passwords do not match!'});
  }


  var hashed_password = crypto.createHash('sha256').update(password1).digest('hex');

  var payload = {
    user: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: hashed_password
    },
    date: new Date(),
    ip: req.ip
  }
  var base64 = urlCrypt.cryptObj(payload);
  var registrationUrl = 'http://' + req.headers.host + '/register/checkLink/' + base64;

  //add the base64 to mongo
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err){ 
      console.log(err);
      return res.status(500).json({error: `Mongo Error: ${err}`})
    }
    var dbo = db.db("TechShop");
    var data = { base64: base64}
    
    dbo.collection("TechShop_Collection").insertOne(data, function(e, result) {
      if (e) console.log(e);

      db.close();
    });
  });

  var message = {
    to: payload.user.email,
    registrationUrl: registrationUrl
  };

  if(sendMail('registration',message)){
    return res.status(200).send('Email sent!')
  }

});

router.post('/verify/', (req, res, next) => {

  const base64 = req.body.base64;

  //extract user info from base64..



  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://TechShop-Website:130795mrS@techshop-cluster.adibf.mongodb.net/TechShop?retryWrites=true&w=majority";

  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err) console.log(err);
    var dbo = db.db("TechShop");
    var newValues = {
      $set: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hashed_password,
        promo_codes: [
          {
            code: "NEWUS3R", 
            description: "%5 discount"
          }
        ]
      },
      $unset: {base64: 1}
    }
    var query = { base64: base64 };

    dbo.collection("TechShop_Collection").updateOne(query,newValues, function(e, result) {
      if (e) console.log(e);
      if(result.ok === 1){
        res.status(200).send('Succesfully registered');
      }else{
        res.status(500).json({error: 'internal server error'});
      }
      db.close();
    });
  });
});








async function sendMail(type,message){
  const to = message.to;

  let sender = {
    email: 'csp.techshop3@gmail.com',
    password: '159753tS'
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: sender.email, // generated ethereal user
      pass: sender.password, // generated ethereal password
    },
  });


  if(type === 'registration'){
    // send mail with defined transport object
    await transporter.sendMail({
      from: 'TechShop Registration <csp.techshop3@gmail.com>', // sender address
      to: to, // list of receivers
      subject: "Verify Your Account", // Subject line
      html: `<center><h1>Welcome to TechShop!</h1><br/><h3><a href="${message.registrationUrl}">Click here</a> to verify your email.</h3></center>`,// html body
    },(err,info) =>{
      return !!err;
    });
    return true
  } else if(type === 'reset-password'){
    // send mail with defined transport object
    transporter.sendMail({
      from: 'TechShop Registration <csp.techshop3@gmail.com>',
      to: to,
      subject: "Reset Your Password",

      //change that to an html page..
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    }, (err, info) => {
      return !!err;
    });
    return true;
  }
  return false;
}

module.exports = router;