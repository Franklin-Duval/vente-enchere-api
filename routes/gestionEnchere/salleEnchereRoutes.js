const express = require('express');
const router = express.Router();

const salleEnchereCtrl = require('../../controllers/gestionEnchere/salleEnchereController');

router.get('/', salleEnchereCtrl.getAllSalleEnchere);
router.post('/', salleEnchereCtrl.createSalleEnchere);
router.get(
  '/inProgress/',
  salleEnchereCtrl.getAllSalleEnchereBeforeSpecificDate,
);
router.get('/:id', salleEnchereCtrl.getOneSalleEnchere);
router.get('/lots/:id', salleEnchereCtrl.getAllSalleEnchereByLot);
router.put('/:id', salleEnchereCtrl.updateOneSalleEnchere);
router.delete('/:id', salleEnchereCtrl.deleteOneSalleEnchere);

module.exports = router;
