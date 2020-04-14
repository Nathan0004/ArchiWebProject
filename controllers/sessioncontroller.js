
let connection = require('../db.js');
let User = require('../models/usermodel.js');
let user = { username: "admin", password: "1234" };
let listeusers = [];
listeusers.push(user);

// Check login and password
let check = function (req, res, next) {
    console.log(req.session.iduser);
    if (req.session && (req.session.iduser >= 0))
        return next();
    else
        return res.status(401).send("Access denied ! <a href='/login_form'>Login</a>");
};
//Ici, on traite le Login
exports.login = function (req, res) {
    listeusers.forEach(user => {
        if (req.query.username === user.username && req.query.password === user.password) {
            req.session.iduser = iduser;
            res.send("login success! <a href='/content'>Goto content</a> ");
        }
        ;
    });
    if (!(req.session.iduser >= 0)) {
        res.send("Login failed ! <a href='/login_form'>Try again</a> ");
    };
};


// Logout and destroy session
exports.logout = function (req, res) {
    req.session.destroy(); res.send("Logout success! ");
};

// Get content endpoint
exports.userlist = function (req, res) {
    check();
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


// Send register form

exports.register_form = function (req, res) {
    res.render('register.ejs')
};

//Save new account

exports.register_save = function (req, res) {
    let user = new User(req.body.iduser, req.body.username, req.body.password);
    console.log(user);
    connection.query("INSERT INTO Users set ?", user, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/userlist');
        }
    });
};

//update user
exports.updateuserpage = function (req, res) {

    let userid = req.params.iduser;
    let sql = "Select * from Users WHERE `Users`.`id` = ? ";
    connection.query(sql, iduser, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            users = resultSQL;
            res.render('updateuser.ejs',
                { iduser: users[0].iduser, username: users[0].username, password: users[0].password });
        }
    });
}


exports.updateuser = function (req, res) {
    let user = new User(req.body.iduser, req.body.username, req.body.password);
    console.log(user);
    connection.query("UPDATE Users SET ? WHERE id = ?",
        [user, req.body.iduser], function (error, resultSQL) {
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
    let sql = "DELETE FROM `Users` WHERE `Users`.`id` = ?"; connection.query(sql, [req.params.iduser], (error, resultSQL) => {
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
    res.render('login_form.ejs', { username: username });
};

