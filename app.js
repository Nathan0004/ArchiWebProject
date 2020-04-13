var express = require('express');
let bodyParser = require('body-parser'); // Pour les POST
let connection = require('./db.js');
var app = express();
const Routes = require('./routes');
let cookieparser = require('cookie-parser');



// on indique à notre fichier d'utiliser BodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// On appelle le fichier Routes
app.use('/', Routes)
// Lecture du CSS/Images par EJS
app.use("/public", express.static('public'))

// Utilisation des cookies
app.use(cookieparser())


.listen(8080);