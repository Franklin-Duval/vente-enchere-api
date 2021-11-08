const express = require('express');
const router = express.Router();

const gerantCtrl = require('../../controllers/gestionCompte/gerantController');

router.get('/', gerantCtrl.getAllGerant);
router.post('/', gerantCtrl.createGerant);
router.get('/:id', gerantCtrl.getOneGerant);
router.put('/:id', gerantCtrl.updateOneGerant);
router.delete('/:id', gerantCtrl.deleteOneGerant);

module.exports = router;
