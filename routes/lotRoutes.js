const express = require('express');
const router = express.Router();

const lotCtrl = require('../controllers/lotController');

router.get('/', lotCtrl.getAllLot);
router.post('/', lotCtrl.createLot);
router.get('/:id', lotCtrl.getOneLot);
router.put('/:id', lotCtrl.updateOneLot);
router.delete('/:id', lotCtrl.deleteOneLot);

module.exports = router;
