let connection = require('../db.js');

let Coach = require('../models/coachmodel.js');
listecoachs = [];

/* Route pour la page "Effectif" + l'import SQL de Coachs + l'import SQL de Joueuses */
exports.effectif = function (req, res) {
    connection.query(" SELECT * from Coachs;", function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            connection.query(" SELECT * from Joueuses;", function (error, resultSQL2) {
                if (error) {
                    res.status(400).send(error);
                }
                else {
                    res.status(200);
                    
                    res.render('effectif.ejs', { listecoachs: resultSQL, listejoueuses: resultSQL2 });
                }
            })
        }
    });
};

/* On ajoute un élément à la liste des coachs */
exports.addcoach = function (req, res) {
    let coach = new Coach(req.body.id, req.body.firstname, req.body.lastname);
    console.log(coach);
    connection.query("INSERT INTO Coachs set ?", coach, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/effectif');
        }
    });
};

/* Supprime un élément de la liste des coachs */
exports.supprcoach = function (req, res) {
    let sql = "DELETE FROM `Coachs` WHERE `Coachs`.`id` = ?"; connection.query(sql, [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/effectif');
        }
    });
};


/* modifier un élément de la liste coachs */
exports.updatecoachpage = function (req, res) {

    let id = req.params.coachid;
    let sql = "Select * from Coachs WHERE `Coachs`.`id` = ? ";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            coachs = resultSQL;
            res.render('updatecoach.ejs',
                { id: coachs[0].id, firstname: coachs[0].firstname, lastname: coachs[0].lastname });
        }
    });
}

exports.updatecoach = function (req, res) {
    let coach = new Coach(req.body.id, req.body.firstname, req.body.lastname);
    console.log(coach);
    connection.query("UPDATE Coachs SET ? WHERE id = ?",
        [coach, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/effectif');
            }
        })
};

