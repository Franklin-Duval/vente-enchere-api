const express = require('express');
const router = express.Router();

const commissairePrisseurCtrl = require('../controllers/commissairePriseurController');

router.get('/', commissairePrisseurCtrl.getAllCommissairePrisseur);
router.post('/', commissairePrisseurCtrl.createCommissairePrisseur);
router.get('/:id', commissairePrisseurCtrl.getOneCommissairePrisseur);
router.put('/:id', commissairePrisseurCtrl.updateOneCommissairePrisseur);
router.delete('/:id', commissairePrisseurCtrl.deleteOneCommissairePrisseur);

module.exports = router;
