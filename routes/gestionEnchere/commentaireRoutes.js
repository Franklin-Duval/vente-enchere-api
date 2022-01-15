const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../../controllers/gestionEnchere/commentaireController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'COMMENTAIRES';
  next();
});

router.get('/', commentaireCtrl.getAllCommentaire);
router.post('/', logMiddleware.createLog, commentaireCtrl.createCommentaire);
router.get('/:id', commentaireCtrl.getOneCommentaire);
router.put(
  '/:id',
  logMiddleware.createLog,
  commentaireCtrl.updateOneCommentaire,
);
router.delete(
  '/:id',
  logMiddleware.createLog,
  commentaireCtrl.deleteOneCommentaire,
);

module.exports = router;
