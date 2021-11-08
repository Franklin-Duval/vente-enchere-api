const express = require('express');
const router = express.Router();

const commissairePriseurCtrl = require('../controllers/commissairePriseurController');

router.get('/', commissairePriseurCtrl.getAllCommissairePriseur);
router.post('/', commissairePriseurCtrl.createCommissairePriseur);
router.get('/:id', commissairePriseurCtrl.getOneCommissairePriseur);
router.put('/:id', commissairePriseurCtrl.updateOneCommissairePriseur);
router.delete('/:id', commissairePriseurCtrl.deleteOneCommissairePriseur);

module.exports = router;
