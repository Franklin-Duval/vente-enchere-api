const express = require('express');
const router = express.Router();
const logCtrl = require('../../controllers/gestionLog/logController');

router.get('/', logCtrl.getAllLog);
router.post('/', logCtrl.createLog);

module.exports = router;
