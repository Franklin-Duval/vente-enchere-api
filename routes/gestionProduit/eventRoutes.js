const express = require('express');
const router = express.Router();

const logMiddleware = require('../../controllers/gestionLog/logController');

const imageMiddleware = require('../../middlewares/imageMiddleware');

const eventCtrl = require('../../controllers/gestionEvent/eventController');

router.use((req, res, next) => {
  req.table = 'EVENEMENT';
  next();
});

router.get('/', eventCtrl.getAllEvent);
router.post('/', logMiddleware.createLog, eventCtrl.createEvent);

router.put(
  '/images/:id',
  logMiddleware.createLog,
  imageMiddleware,
  eventCtrl.addImagesEvent,
);

router.get('/:id', eventCtrl.getOneEvent);

router.put(
  '/:id',
  logMiddleware.createLog,
  imageMiddleware,
  eventCtrl.updateOneEvent,
);

router.delete('/:id', logMiddleware.createLog, eventCtrl.deleteOneEvent);

router.get('/vendeur/:id', eventCtrl.getAllEventByVendeur);

module.exports = router;
