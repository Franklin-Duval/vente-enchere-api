const express = require('express');
const router = express.Router();

const feedbackCtrl = require('../../controllers/gestionEnchere/feedbackController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'FEEDBACKS';
  next();
});

router.get('/', feedbackCtrl.getAllFeedBack);
router.post('/', logMiddleware.createLog, feedbackCtrl.createFeedBack);
router.get('/:id', feedbackCtrl.getOneFeedBack);
router.put('/:id', logMiddleware.createLog, feedbackCtrl.updateOneFeedBack);
router.delete('/:id', logMiddleware.createLog, feedbackCtrl.deleteOneFeedBack);

module.exports = router;
