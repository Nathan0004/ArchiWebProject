let connection = require('../db.js');

let Coach = require('../models/coachmodel.js');
listecoachs = [];

/* Affichage de la liste des Coachs au format JSON (route API) */
exports.effectif = function (req, res) {
    connection.query(" SELECT * from Coachs;", function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200);
            console.log(resultSQL)
            res.json({ listecoachs: resultSQL });
        }
    })
};

/* Affichage d'un coach dans l'API au format JSON (route API) */
exports.getcoach = function (req, res) {

    let id = req.params.id;
    let sql = "Select * from Coachs WHERE `Coachs`.`id` = ? ";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200);
            console.log(resultSQL);
            coachs = resultSQL;
            res.json({ id: coachs[0].id, firstname: coachs[0].firstname, lastname: coachs[0].lastname });
        }
    });
}


/* On ajoute un coach à la liste des coachs au format JSON (route API) */
exports.addcoach = function (req, res) {

    let coach = new Coach(req.body.id, req.body.firstname, req.body.lastname);
    console.log(coach);
    connection.query("INSERT INTO Coachs set ?", coach, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

/* Supprime un élément de la liste des coachs (route API) */
exports.supprcoach = function (req, res) {
    let sql = "DELETE FROM `Coachs` WHERE `Coachs`.`id` = ?"; connection.query(sql, [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.json({ "message": 'success' });
        }
    });
};


/* Update d'un Coach (route API) */

exports.updatecoach = function (req, res) {
    let coach = new Coach(req.body.id, req.body.firstname, req.body.lastname);
    console.log(coach);
    connection.query("UPDATE Coachs SET ? WHERE id = ?",
        [coach, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(202).json({ "message": 'success' });
            }
        })
};

