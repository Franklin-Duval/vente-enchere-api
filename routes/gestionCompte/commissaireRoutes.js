const express = require('express');
const router = express.Router();

const commissaireCtrl = require('../../controllers/gestionCompte/commissaireController');

router.get('/', commissaireCtrl.getAllCommissaire);
router.post('/', commissaireCtrl.createCommissaire);
router.get('/:id', commissaireCtrl.getOneCommissaire);
router.put('/:id', commissaireCtrl.updateOneCommissaire);
router.delete('/:id', commissaireCtrl.deleteOneCommissaire);

module.exports = router;
