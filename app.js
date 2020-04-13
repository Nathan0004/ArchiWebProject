var express = require('express');
let bodyParser = require('body-parser'); // Pour les POST
let connection = require('./db.js');
var app = express();
const Routes = require('./routes');
let cookieParser = require('cookie-parser'); 
let session = require('express-session');






// on indique à notre fichier d'utiliser BodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// On appelle le fichier Routes
app.use('/', Routes)
// Lecture du CSS/Images par EJS
app.use("/public", express.static('public'));

//Initialisation des cookies 
app.use(cookieParser());
// Initialisation des "sessions" utilisateurs
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
  }));
// Utilisation du Middleware d'authentification (TBD)

// Check login and password
    let check = function(req, res, next) { 
        console.log(req.session.iduser);
       if (req.session && (req.session.iduser >=0 ) )
             return next();
           else
       return res.status(401).send("Access denied ! <a href='/login_form'>Login</a>"); };




app.listen(8080);