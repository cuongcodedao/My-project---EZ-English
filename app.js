var express = require('express');
var app = express();

var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cuongkk123***",
  database: "java_t5"
});
con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM english_voca";
  con.query(sql, function(err, results) {
    if (err) throw err;
    else{
      var flashcards = [];
      for(var val of results){
        flashcards.push({term: results.term, definition: results.definition});
      }
      module.exports = flashcards;
    }
  });
});





