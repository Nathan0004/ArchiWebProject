let connection = require('../db.js');
let Match = require('../models/matchmodel.js');
listematchs = [];
/* Route pour la page "Matchs" + l'import SQL des matchs */
exports.matchs = function (req, res) {
    connection.query(" SELECT * from Matchs;", function (error, resultSQL3) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            connection.query(" SELECT * from Coachs;", function (error, resultSQL) {
                if (error) {
                    res.status(400).json({ "message": error });
                }
                else {
                    connection.query(" SELECT * from Joueuses;", function (error, resultSQL2) {
                        if (error) {
                            res.status(400).json({ "message": error });
                        }
                        else {
                            res.status(200);
                            console.log(resultSQL)
                            console.log(resultSQL2)
                            res.json({ listematchs: resultSQL3 });
                        }
                    })
                }
            });
        };
    })
};

/* On ajoute un élément à la liste des matchs */
exports.addmatch = function (req, res) {
    let match = new Match(req.body.id, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.matchcoach, req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, req.body.MD, req.body.DG, req.body.DCG, req.body.DCD, req.body.DD, req.body.G);
    console.log(match);
    connection.query("INSERT INTO Matchs set ?", match, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        } else {
            res.status(200).json({ "message": success });
        }
    });
};

/* Supprime un élément de la liste des matchs */
exports.supprmatch = function (req, res) {
    let sql = "DELETE FROM `Matchs` WHERE `Matchs`.`id` = ?";
    connection.query(sql, [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": error });
        } else {
            res.status(200).json({ "message": success });
        }
    });
};

/* modifier un élément de la liste matchs */
exports.updatematchpage = function (req, res) {

    let id = req.params.matchid;
    let sql = "Select * from Matchs WHERE `Matchs`.`id` = ? ";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }

        else {
            connection.query(" SELECT * from Coachs;", function (error, resultcoach) {
                if (error) {
                    res.status(400).json({ "message": error });
                }
                else {
                    connection.query(" SELECT * from Joueuses;", function (error, resultjoueuses) {
                        if (error) {
                            res.status(400).json({ "message": error });
                        }
                        else {
                            res.status(200).json({ "message": success });
                            matchs = resultSQL;
                            res.json(
                                {
                                    id: matchs[0].id, titre: matchs[0].titre, date: matchs[0].date, heure: matchs[0].heure, adresse: matchs[0].adresse, matchcoach: matchs[0].matchcoach, AG: matchs[0].AG, BU: matchs[0].BU,
                                    AD: matchs[0].AD, MG: matchs[0].MG, MC: matchs[0].MC, MD: matchs[0].MD, DG: matchs[0].DG, DCG: matchs[0].DCG, DCD: matchs[0].DCD, DD: matchs[0].DD, G: matchs[0].G, listecoachs: resultcoach, listejoueuses: resultjoueuses
                                });

                        }
                    })
                }
            });
        };
    })
};


exports.updatematch = function (req, res) {
    let match = new Match(req.body.id, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.matchcoach, req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, req.body.MD, req.body.DG, req.body.DCG, req.body.DCD, req.body.DD, req.body.G);
    console.log(match);
    connection.query("UPDATE Matchs SET ? WHERE id = ?",
        [match, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": error });
            } else {
                res.status(200).json({ "message": success });
            }
        })
};