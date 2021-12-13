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
  host: 'localhost',
  user: 'admin',
  password: '123',
  database: 'db'
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

  //
  // Το query αυτό επιστρέφει το password του συγκεκριμένου user ώστε να το συγκρίνουμε
  //  με αυτό που δίνει ο χρήστης του site.  Εάν είναι ίδιο έχουμε επιτυχία!
  //
  const query = "SELECT password FROM users WHERE name LIKE \'" + username + "\'";

  con.query(query, (err, result, fields) => {
    if (err) throw err;

    // error; got no results
    if (result.length == 0)
      console.log('Error: no such user exists.');

    // error; got more than one line 
    if (result.length != 1)
      console.log('Error: we have more rows than expected.');
    
    var row = JSON.parse(JSON.stringify(result[0]));
    if (!row)
      console.log('Error: we could not get row');

    if (password == row.password)
    {
      // This sets redirection url in the res of the request
      //  It will be handled by the browser code on request
      //  result handling code (a.k.a. .then())
      res.redirect('/user');
    }
    else
    {
      res.redirect('/');  // return to home page
      console.log('Passwords do not match; returning to home page!');
    }

    // Ολοκλήρωση του request
    res.end();
  });
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
