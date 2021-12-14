const express = require('express');
const router = express.Router();

const connectionCtrl = require('../../controllers/gestionEnchere/connectionController');

router.get('/', connectionCtrl.getAllConnection);
router.post('/', connectionCtrl.createConnection);
router.get('/:id', connectionCtrl.getOneConnection);
router.put('/:id', connectionCtrl.updateOneConnection);
router.delete('/:id', connectionCtrl.deleteOneConnection);

module.exports = router;
