const express = require('express');

const router = express.Router();

// Controllers
const sauceCtrl = require('../controllers/sauce');

//Authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CRUD
// Send and Save sauces to the database
router.post('/', auth, multer, sauceCtrl.createSauce);
// To modify or update the product
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Delete a sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Retrieve a specific SAUCE
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Return all Sauces in the database
router.get('/', auth, sauceCtrl.getAllSauce);
//Send likes and dislikes
router.post('/:id/like', auth, sauceCtrl.likeAndDislikes);

module.exports = router;