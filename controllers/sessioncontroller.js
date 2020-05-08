
let connection = require('../db.js');
let User = require('../models/usermodel.js');
let listeusers = [];




// Check login and password
let check = function (req, res, next) {
    
    if (req.session && (req.session.id >= 0))
        return next();
    else
        return res.status(401).send("Access denied ! <a href='/login_form'>Login</a>");
};

// Get content endpoint
exports.userlist =  function (req, res) {
    
    
    {
        connection.query(" SELECT * from Users;", function (error, resultSQL) {
            if (error) {
                res.status(400).send(error);
            }

            else {
                res.status(200);
                console.log(resultSQL)

                res.render('userlist.ejs', { listeusers: resultSQL });
            }
        })
    }
};
//Ici, on traite le Login
exports.login = function (req, res) {
    
    listeusers.forEach(function(user) {
        console.log(listeusers);
        if  (req.query.username === user.username && req.query.password === user.password) {
            
            res.send("login success! <a href='/userlist'>Goto content</a> ");
        }
        ;
    });
    if (!(req.session.id >= 0)) {
        res.send("Login failed ! <a href='/login_form'>Try again</a> ");
    };
};


// Logout and destroy session
exports.logout = function (req, res) {
    req.session.destroy(); res.send("Logout success! ");
};




// Send register form

exports.register_form = function (req, res) {
    res.render('register.ejs')
};

//Save new account/adduser

exports.register_save = function (req, res) {
    let user = new User(req.body.id, req.body.username, req.body.password);
    console.log(user);
    connection.query("INSERT INTO Users set ?", user, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/login_form');
        }
    });
};

//update user
exports.updateuserpage = function (req, res) {

    let id = req.params.id;
    let sql = "Select * from Users WHERE `Users`.`id` = ? ";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            users = resultSQL;
            res.render('updateuser.ejs',
                { iduser: users[0].id, username: users[0].username, password: users[0].password });
        }
    });
}


exports.updateuser = function (req, res) {
    let user = new User(req.body.id, req.body.username, req.body.password);
    console.log(user);
    connection.query("UPDATE Users SET ? WHERE id = ?",
        [user, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/userlist');
            }
        })
};
//delete user
exports.deleteuser = function (req, res) {
    let sql = "DELETE FROM `Users` WHERE `Users`.`id` = ?"; connection.query(sql, [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/userlist');
        }
    });
};

// Send login form
exports.login_form = function (req, res) {
    let username = "";
    if (req.cookies && req.cookies.username)
        username = req.cookies.username
    res.render('login_form.ejs', { username: username});
};

