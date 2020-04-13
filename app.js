var express = require('express');
let bodyParser = require('body-parser'); // Pour les POST
let connection = require('./db.js');
var app = express();
const Routes = require('./routes');
let cookieParser = require('cookie-parser'); 
let session = require('express-session');
const logs = (req, res, next) => { console.log(req.sessionID); next();
}; 




// on indique à notre fichier d'utiliser BodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// On appelle le fichier Routes
app.use('/', Routes)
// Lecture du CSS/Images par EJS
app.use("/public", express.static('public'));
// Initialisation des cookies 
app.use(cookieParser());
// Initialisation des "sessions" utilisateurs
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
  }));
// Utilisation du Middleware d'authentification
  app.use(logs)




.listen(8080);