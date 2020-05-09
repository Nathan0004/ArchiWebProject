let connection = require('../db.js');

let Joueuse = require('../models/joueusemodel.js');
listejoueuses = [];


/* affichage joueuses */ 
exports.effectifj = function (req, res) {
    connection.query(" SELECT * from Joueuses;", function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
                else {
                    res.status(200);
                    console.log(resultSQL)
                    res.json({ listejoueuses: resultSQL });
                }
            })
        };

/* Affichage d'une joueuse */ 
exports.getjoueuse = function (req, res) {

    let id = req.params.id;
    let sql = "Select * from Joueuses WHERE `Joueuses`.`id` = ? ";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            joueuses = resultSQL;
            res.json(
                { id: joueuses[0].id, firstname: joueuses[0].firstname, lastname: joueuses[0].lastname });
        }
    });
}
    
/* On ajoute un élément à la liste des joueuses */
exports.addjoueuse = function (req, res) {
    let joueuse = new Joueuse(req.body.id, req.body.firstname, req.body.lastname);
    console.log(joueuse);
    connection.query("INSERT INTO Joueuses set ?", joueuse, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

/* Supprime un élément de la liste des joueuses */
exports.supprjoueuse = function (req, res) {
    let sql = "DELETE FROM `Joueuses` WHERE `Joueuses`.`id` = ?"; connection.query(sql, [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error '});
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

/* route update */

exports.updatejoueuse = function (req, res) {
    let joueuse = new Joueuse(req.body.id, req.body.firstname, req.body.lastname);
    console.log(joueuse);
    connection.query("UPDATE Joueuses SET ? WHERE id = ?",
        [joueuse, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(200).json({ "message": 'success' });
            }
        })
};


