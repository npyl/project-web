const express     = require('express');
const app         = express();
const server      = require('http').Server(app);
var mysql         = require('mysql');
const bodyParser  = require('body-parser');

const __project_root = __dirname + '/src';

/* project root */
app.use(express.static(__project_root));

/* 
 * Χρησιμοποιούμε αυτό το plugin για να 
 * μετατρέψουμε το body των POST requests 
 * από JSON σε μεταβλήτές πιο εύκολα
 */
app.use(bodyParser.json());

/*
 * Αυτό χρειάζεται για να μπορεί το express να ερμηνεύσει
 *  τα form data σαν url data και να μπορέσουμε να τα πάρουμε
 *  κατευθείαν όπως παρακάτω.  Εάν δεν το κάναμε αυτό, θα
 *  έπρεπε να 
 */
app.use(express.urlencoded({
  extended: true
}))

//==================================
//  SQL Initialisation
//==================================

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "moonbase1."
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//==================================
//  HTML Requests Handling
//==================================

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

// 
// Handles Signup form
// 
app.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log('username: ', username);
  console.log('email: ', email);
  console.log('password: ', password);

  // This sets redirection url in the res of the request
  //  It will be handled by the browser code on request
  //  result handling code (a.k.a. .then())
  res.redirect('/user');

  // Ολοκλήρωση του request
  res.end();
});

// 
// Handle a user or admin page
// 
app.get('/user', (req, res) => {
	res.sendFile('user.html', { root: __project_root });
});
app.get('/admin', (req, res) => {
	res.sendFile('admin.html', { root: __project_root });
});

server.listen(3000);
