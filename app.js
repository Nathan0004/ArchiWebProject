var express = require('express');
let bodyParser = require('body-parser'); // Pour les POST
let connection = require('./db.js');
var app = express();
const Routes = require('./routes');
let session = require('express-session');
let cookieParser = require('cookie-parser');

//Initialisation des cookies 
app.use(cookieParser());
// Initialisation des "sessions" utilisateurs



app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
}));
// on indique à notre fichier d'utiliser BodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// On appelle le fichier Routes
app.use('/', Routes)
// Lecture du CSS/Images par EJS
app.use("/public", express.static('public'));




app.listen(8000);