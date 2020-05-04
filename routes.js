const express = require('express');
const router = express.Router();

const accueilcontroller = require('./controllers/accueilcontroller.js');
const coachcontroller = require('./controllers/coachcontroller.js');
const joueusecontroller = require('./controllers/joueusecontroller.js');
const matchcontroller = require('./controllers/matchcontroller.js');

/* routes API */
const coachapicontroller = require('./controllers/coachapicontroller.js');
const joueuseapicontroller = require('./controllers/joueuseapicontroller.js');
const matchapicontroller = require('./controllers/matchapicontroller.js');

/* Routes authentification */
const sessioncontroller = require('./controllers/sessioncontroller.js');

/* Routes des trois vues principales */
/* Route pour la page "Accueil" */
router.get('/accueil', accueilcontroller.accueil);
/* Route pour la page "Effectif" */
router.get('/effectif', coachcontroller.effectif);
/* Route pour la page "Matchs" */
router.get('/matchs', matchcontroller.matchs);


/* On ajoute un élément à la liste des coachs */
router.post('/effectif/ajouter/', coachcontroller.addcoach);
/* Supprime un élément de la liste des coachs */
router.get('/effectif/supprimer/:id', coachcontroller.supprcoach);
/* Modifier un élément de la liste coachs */
router.get('/effectif/update/:coachid', coachcontroller.updatecoachpage);
router.post('/effectif/update', coachcontroller.updatecoach);

/* On ajoute un élément à la liste des joueuses */
router.post('/effectifj/ajouter/', joueusecontroller.addjoueuse);
/* Supprime un élément de la liste des joueuses */
router.get('/effectifj/supprimer/:id', joueusecontroller.supprjoueuse);
/* Modifier un élément de la liste joueuses */
router.get('/effectifj/update/:joueuseid', joueusecontroller.updatejoueusepage);
router.post('/effectifj/update', joueusecontroller.updatejoueuse);

/* On ajoute un élément à la liste des matchs */
router.post('/matchs/ajouter/', matchcontroller.addmatch);
/* Supprime un élément de la liste des matchs */
router.get('/matchs/supprimer/:id', matchcontroller.supprmatch);

/* Modifier un élément de la liste matchs */
router.get('/matchs/update/:matchid', matchcontroller.updatematchpage);
router.post('/matchs/update', matchcontroller.updatematch);

/* ROUTES API */

/* affichage Coachs */
router.get('/api/effectif', coachapicontroller.effectif);
/* Ajout d'un coach */
router.post('/api/effectif/', coachapicontroller.addcoach);
/* Suppression d'un coach */
router.delete('/api/effectif/id', coachapicontroller.supprcoach);
/* Modification d'un Coach */
router.put('/api/effectif/id', coachapicontroller.updatecoach);

/* Affichage Joueuses */
router.get('/api/effectifj', joueuseapicontroller.effectifj);
/* Ajout d'une Joueuse */
router.post('/api/effectifj/', joueuseapicontroller.addjoueuse);
/* Suppression d'une Joueuse */
router.delete('/api/effectifj/id', joueuseapicontroller.supprjoueuse);
/* Modification d'une Joueuse */
router.put('/api/effectifj/id', joueuseapicontroller.updatejoueuse);

/* Affichage liste des matches */
router.get('/api/matchs/', matchapicontroller.matchs);
/* Ajout d'un Match */
router.post('/api/matchs/', matchapicontroller.addmatch);
/* Suppression d'un Match */
router.delete('/api/matchs/id', matchapicontroller.supprmatch);
/* Modification d'un Match */
router.put('/api/matchs/id', matchapicontroller.updatematch);

/* Routes Authentif/Session */
//Ici, on traite le Login
router.get('/login', sessioncontroller.login);
// Logout and destroy session
router.get('/logout', sessioncontroller.logout);
// Get content endpoint
router.get('/userlist', sessioncontroller.userlist);
// Send register form
router.get('/register_form', sessioncontroller.register_form);
//Save new account
router.post('/register_save', sessioncontroller.register_save);
//update user
router.put('/user/:id', sessioncontroller.updateuser);
//delete user
router.get('/delete/user/:id', sessioncontroller.deleteuser);
// Send login form
router.get('/login_form', sessioncontroller.login_form);


module.exports = router;