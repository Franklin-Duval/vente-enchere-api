const express = require('express');
const router = express.Router();

const compteCtrl = require('../../controllers/gestionCompte/compteController');

router.get('/', compteCtrl.getAllCompte);
router.post('/', compteCtrl.createCompte);
router.get('/:id', compteCtrl.getOneCompte);
router.put('/:id', compteCtrl.updateOneCompte);
router.put('/activecompte/:id', compteCtrl.activateOneCompte);
router.put('/changepassword/:id', compteCtrl.changePassword);
router.delete('/:id', compteCtrl.deleteOneCompte);

module.exports = router;
