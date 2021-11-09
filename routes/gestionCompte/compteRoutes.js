const express = require('express');
const router = express.Router();

const compteCtrl = require('../../controllers/gestionCompte/compteController');

router.get('/', compteCtrl.getAllCompte);
router.post('/', compteCtrl.createCompte);
router.get('/:id', compteCtrl.getOneCompte);
router.patch('/:id', compteCtrl.updateOneCompte);
router.patch('/activecompte/:id', compteCtrl.activateOneCompte);
router.patch('/changepassword/:id', compteCtrl.changePassword);
router.delete('/:id', compteCtrl.deleteOneCompte);

module.exports = router;
