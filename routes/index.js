var express = require('express');
var router = express.Router();
var sql = require("mssql");
var MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/products', async (req, res, next) => {
  var config = {
    user: 'user',
    password: 'password',
    server: 'localhost', 
    database: 'MyMSSQLDatabase' 
  };

  try {
    await sql.connect(config)
    const result = await sql.query`select * from Product`
    sql.close();
    res.send(result.recordset);
  } catch (err) {
    sql.close();
  }
    
});

router.get('/logs', async (req, res, next) => {
  var url = "mongodb://mongoUser:mongoPass@localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=connName";

  MongoClient.connect(url, function(err, mongoclient) {
    if (err) throw err;
    var db = mongoclient.db("TheCartMongoDb");
    db.collection("Logs").findOne({}, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});
module.exports = router;
