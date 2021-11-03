const express = require('express');
const imageCtrl = require('../controllers/imageController');

const router = express.Router();

router.get('/:id', imageCtrl.getOneImage);
router.delete('/:id', imageCtrl.deleteOneImage);

module.exports = router;
