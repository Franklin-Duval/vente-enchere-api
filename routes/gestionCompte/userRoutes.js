const express = require('express');
const router = express.Router();

const userCtrl = require('../../controllers/gestionCompte/userController');

router.get('/', userCtrl.getAllUser);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getOneUser);
router.patch('/:id', userCtrl.updateOneUser);
router.delete('/:id', userCtrl.deleteOneUser);

module.exports = router;
