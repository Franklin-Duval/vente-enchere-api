const express = require('express');
const router = express.Router();

const rappelCtrl = require('../../controllers/gestionEnchere/rappelController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'RAPPELS';
  next();
});

router.get('/', rappelCtrl.getAllRappel);
router.post('/', logMiddleware.createLog, rappelCtrl.createRappel);
router.get('/:id', rappelCtrl.getOneRappel);
router.put('/:id', logMiddleware.createLog, rappelCtrl.updateOneRappel);
router.delete('/:id', logMiddleware.createLog, rappelCtrl.deleteOneRappel);

module.exports = router;
