const express = require('express');
const router = express.Router();

const feedbackCtrl = require('../../controllers/gestionEnchere/feedbackController');

router.get('/', feedbackCtrl.getAllFeedBack);
router.post('/', feedbackCtrl.createFeedBack);
router.get('/:id', feedbackCtrl.getOneFeedBack);
router.put('/:id', feedbackCtrl.updateOneFeedBack);
router.delete('/:id', feedbackCtrl.deleteOneFeedBack);

module.exports = router;
