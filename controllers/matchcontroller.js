let connection = require('../db.js');
let Match = require('../models/matchmodel.js');
listematchs = [];


/* Route pour la page "Matchs" + l'import SQL des matchs */
exports.matchs = function (req, res) {
    connection.query(" SELECT * from Matchs INNER JOIN Coachs ON Matchs.fk_id_coach = Coachs.id ;", function (error, resultSQL3) {
        if (error) {
            res.status(400).send(error);
        }
        else {
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
                            console.log(resultSQL)
                            console.log(resultSQL2)
                            res.render('matchs.ejs', { listematchs: resultSQL3, listecoachs: resultSQL, listejoueuses: resultSQL2 });

                        }
                    })
                }
            });
        };
    })
};

/* On ajoute un élément à la liste des matchs */
exports.addmatch = function (req, res) {
    let match = new Match(req.body.id_match, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.fk_id_coach, req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, req.body.MD, req.body.DG, req.body.DCG, req.body.DCD, req.body.DD, req.body.G);
    console.log(match);
    connection.query("INSERT INTO Matchs set ?", match, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/matchs');
        }
    });
};

/* Supprime un élément de la liste des matchs */
exports.supprmatch = function (req, res) {
    let sql = "DELETE FROM `Matchs` WHERE `Matchs`.`id_match` = ?";
    connection.query(sql, [req.params.id_match], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/matchs');
        }
    });
};

/* modifier un élément de la liste matchs */

/* On renvoie la liste des matchs, des coachs et des joueuses vers la page updatematch */
exports.updatematchpage = function (req, res) {

    let id_match = req.params.id_match;
    let sql = " SELECT * from Matchs INNER JOIN Coachs ON Matchs.fk_id_coach = Coachs.id WHERE `Matchs`.`id_match` = ? ;";
    connection.query(sql, id_match, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }

        else {
            connection.query(" SELECT * from Coachs;", function (error, resultcoach) {
                if (error) {
                    res.status(400).send(error);
                }
                else {
                    connection.query(" SELECT * from Joueuses;", function (error, resultjoueuses) {
                        if (error) {
                            res.status(400).send(error);
                        }
                        else {
                            res.status(200);
                            matchs = resultSQL;
                            res.render('updatematch.ejs',
                                {
                                    id_match: matchs[0].id_match, titre: matchs[0].titre, date: matchs[0].date, heure: matchs[0].heure, adresse: matchs[0].adresse, fk_id_coach: matchs[0].fk_id_coach, AG: matchs[0].AG, BU: matchs[0].BU,
                                    AD: matchs[0].AD, MG: matchs[0].MG, MC: matchs[0].MC, MD: matchs[0].MD, DG: matchs[0].DG, DCG: matchs[0].DCG, DCD: matchs[0].DCD, DD: matchs[0].DD, G: matchs[0].G, firstname: matchs[0].firstname, lastname: matchs[0].lastname,listecoachs: resultcoach, listejoueuses: resultjoueuses
                                });

                        }
                    })
                }
            });
        };
    })
};

/* fonction d'update */
exports.updatematch = function (req, res) {
    let match = new Match(req.body.id_match, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.fk_id_coach, req.body.AG, req.body.BU, req.body.AD,
        req.body.MG, req.body.MC, req.body.MD, req.body.DG, req.body.DCG, req.body.DCD, req.body.DD, req.body.G);
    console.log(match);
    connection.query("UPDATE Matchs SET ? WHERE id_match = ?",
        [match, req.body.id_match], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/matchs');
            }
        })
};