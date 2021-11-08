const express = require('express');
const router = express.Router();

const vendeurCtrl = require('../../controllers/gestionCompte/vendeurController');

router.get('/', vendeurCtrl.getAllVendeur);
router.post('/', vendeurCtrl.createVendeur);
router.get('/:id', vendeurCtrl.getOneVendeur);
router.put('/:id', vendeurCtrl.updateOneVendeur);
router.delete('/:id', vendeurCtrl.deleteOneVendeur);

module.exports = router;
