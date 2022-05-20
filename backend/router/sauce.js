const express = require('express');

const router = express.Router();

// Modele sauce
const sauceCtrl = require('../controllers/sauce');
//Authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CRUD
// Envoi et Sauvegarde des sauces sur la base de donnee
router.post('/', sauceCtrl.createSauce);
// Pour modifier ou mettre a jour le produit
router.put('/:id', sauceCtrl.modifySauce);
// Suppression d'une sauce 
router.delete('/:id', sauceCtrl.deleteSauce);
// Récupération d'une SAUCE spécifique
router.get('/:id', sauceCtrl.getOneSauce);
// Renvoie tous les Sauce dans la base de données
router.get('/', sauceCtrl.getAllSauce);

module.exports = router;