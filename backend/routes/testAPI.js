var express = require('express');
// var client = require('../mongo');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.send({text: 'testing...'})
    // perform actions on the collection object
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://TechShop-Website:130795mrS@techshop-cluster.adibf.mongodb.net/TechShop?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("TechShop");
      dbo.collection("TechShop_Collection").find({}).toArray(function(e, result) {
        if (e) throw e;
        res.json(result);
        db.close();
        
      });
    });
});



module.exports = router;