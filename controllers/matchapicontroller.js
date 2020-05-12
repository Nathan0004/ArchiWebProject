let connection = require('../db.js');
let Match = require('../models/matchmodel.js');
listematchs = [];
/* Affichage de tous les Matchs dans une API au format JSON */
exports.matchs = function (req, res) {
    connection.query
        (" SELECT * from Matchs INNER JOIN Coachs ON Matchs.fk_id_coach = Coachs.id ;", function (error, resultSQL3) {
            if (error) {
                res.status(400).json({ "message": 'error' });
            }

            else {
                res.status(200);
                res.json({ listematchs: resultSQL3 });
            }
        })
};

/* Selection d'un match (API) */
exports.getmatch = function (req, res) {

    let id_match = req.params.id_match;
    let sql = "Select * from Matchs WHERE `Matchs`.`id_match` = ? ";
    connection.query(sql, id_match, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200);
            console.log(resultSQL);
            matchs = resultSQL;
            res.json({matchs : matchs
            });
        }
    });
}
/* On ajoute un élément à la liste des matchs */
exports.addmatch = function (req, res) {
    let match = new Match(
        req.body.id_match, req.body.titre, 
        req.body.date, req.body.heure, 
        req.body.adresse, req.body.fk_id_coach, 
        req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, 
        req.body.MD, req.body.DG, 
        req.body.DCG, req.body.DCD, 
        req.body.DD, req.body.G
        );
    console.log(match);
    connection.query("INSERT INTO Matchs set ?", match, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

/* Supprime un élément de la liste des matchs(route API) */
exports.supprmatch = function (req, res) {
    let sql = "DELETE FROM `Matchs` WHERE `Matchs`.`id_match` = ?";
    connection.query(sql, [req.params.id_match], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

/* Update d'un match (route API) */

exports.updatematch = function (req, res) {
    let match = new Match(
        req.body.id_match, req.body.titre, 
        req.body.date, req.body.heure, 
        req.body.adresse, req.body.fk_id_coach, 
        req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, req.body.MD, 
        req.body.DG, req.body.DCG, req.body.DCD, 
        req.body.DD, req.body.G);
    console.log(match);
    connection.query("UPDATE Matchs SET ? WHERE id_match = ?",
        [match, req.body.id_match], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(200).json({ "message": 'success' });
            }
        })
};