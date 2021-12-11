const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

server.listen(3000);
