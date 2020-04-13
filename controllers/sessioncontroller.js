

let user = { username : "admin", password : "1234"};
let users = [];
users.push(user);

// Check login and password
    let check = function(req, res, next) { 
        console.log(req.session.iduser);
       if (req.session && (req.session.iduser >=0 ) )
             return next();
           else
       return res.status(401).send("Access denied ! <a href='/login_form'>Login</a>"); };
//Ici, on traite le Login
exports.login = function (req, res) { i = 0;
    users.forEach(user => {
    if(req.query.username === user.username && req.query.password === user.password ) {
    req.session.iduser = i;
    res.send("login success! <a href='/content'>Goto content</a> "); }
    i++; });
    if ( ! (req.session.iduser >= 0) ) {
    res.send("Login failed ! <a href='/login_form'>Try again</a> ");
    }; };


    // Logout and destroy session
exports.logout = function (req, res) { req.session.destroy(); res.send("Logout success! ");
};

// Get content endpoint
exports.content =  function (req, res) {
    check();
    res.send("You can only see this after you've logged in.</br> <a href='/logout'>Logout</a> ")
    };
     
// Send register form

exports.register_form = function (req,res) { 
res.render('register.ejs')
};

//Save new account

exports.register_save =  function (req, res) {
    console.log(req.body);
    let user = {username : req.body.username, password : req.body.password}; 
    users.push(user);
    console.log(users);
    res.send("User created! <a href='/content'> Go to content </a>")

};

//update user
exports.updateuser = function (req, res) {
let user = { username : req.body.username, password : req.body.password };
users[req.params.iduser]=user;
res.send('user updated');
};
//delete user
exports.deleteuser = function (req, res) {
    users.splice(req.params.iduser,1);
    console.log(users);
    res.send('user deleted');
    };

// Send login form
exports.login_form = function (req,res) {
    let username = "";
    if (req.cookies && req.cookies.username) 
    username = req.cookies.username
    res.render('login_form.ejs', {username : username});
};
 
