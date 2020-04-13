var express = require('express');
let bodyParser = require('body-parser'); // Pour les POST
let connection = require('./db.js');
var app = express();
const Routes = require('./routes');
let cookieParser = require('cookie-parser'); 






// on indique à notre fichier d'utiliser BodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// On appelle le fichier Routes
app.use('/', Routes)
// Lecture du CSS/Images par EJS
app.use("/public", express.static('public'));
// Initialisation des cookies 
app.use(cookieParser());

//Logs sessions init liste des users ( liste pour le moment)
let session = require('express-session');
let user = { username : "admin", password : "1234"};
let users = [];
users.push(user);


// const logs = (req, res, next) => { console.log(req.sessionID); next();
//}; 

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
//Ici, on traite le Login
app.get('/login', function (req, res) { i = 0;
    users.forEach(user => {
    if(req.query.username === user.username && req.query.password === user.password ) {
    req.session.iduser = i;
    res.send("login success! <a href='/content'>Goto content</a> "); }
    i++; });
    if ( ! (req.session.iduser >= 0) ) {
    res.send("Login failed ! <a href='/login_form'>Try again</a> ");
    }; });


    // Logout and destroy session
app.get('/logout', function (req, res) { req.session.destroy(); res.send("Logout success! ");
});

// Get content endpoint
app.get('/content', check, function (req, res) {
    res.send("You can only see this after you've logged in.</br> <a href='/logout'>Logout</a> ")
    });
     
// Send register form

app.get('/register_form', function (req,res) { 
res.render('register.ejs')
});

//Save new account

app.post('/register_save',  function (req, res) {
    console.log(req.body);
    let user = {username : req.body.username, password : req.body.password}; 
    users.push(user);
    console.log(users);
    res.send("User created! <a href='/content'> Go to content </a>")

});

//update user
app.put('/user/:iduser', function (req, res) {
let user = { username : req.body.username, password : req.body.password };
users[req.params.iduser]=user;
res.send('user updated');
});
//delete user
app.delete('/user/:iduser', function (req, res) {
    users.splice(req.params.iduser,1);
    console.log(users);
    res.send('user deleted');
    });

// Send login form
app.get('/login_form', function (req,res) {
    let username = "";
    if (req.cookies && req.cookies.username) 
    username = req.cookies.username
    res.render('login_form.ejs', {username : username});
});
 


app.listen(8080);