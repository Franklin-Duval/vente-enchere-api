const express = require('express');
const router = express.Router();

const ponnectionCtrl = require('../../controllers/gestionEnchere/participationController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'PARTICIPATIONS';
  next();
});

router.get('/', ponnectionCtrl.getAllParticipation);
router.post('/', logMiddleware.createLog, ponnectionCtrl.createParticipation);
router.get('/:id', ponnectionCtrl.getOneParticipation);
router.put(
  '/:id',
  logMiddleware.createLog,
  ponnectionCtrl.updateOneParticipation,
);
router.delete(
  '/:id',
  logMiddleware.createLog,
  ponnectionCtrl.deleteOneParticipation,
);

module.exports = router;
