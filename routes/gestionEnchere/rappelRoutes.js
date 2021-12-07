const express = require('express');
const router = express.Router();

const rappelCtrl = require('../../controllers/gestionEnchere/rappelController');

router.get('/', rappelCtrl.getAllRappel);
router.post('/', rappelCtrl.createRappel);
router.get('/:id', rappelCtrl.getOneRappel);
router.put('/:id', rappelCtrl.updateOneRappel);
router.delete('/:id', rappelCtrl.deleteOneRappel);

module.exports = router;
