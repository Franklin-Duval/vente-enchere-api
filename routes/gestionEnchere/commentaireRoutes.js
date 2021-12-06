const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../../controllers/gestionEnchere/commentaireController');

router.get('/', commentaireCtrl.getAllCommentaire);
router.post('/', commentaireCtrl.createCommentaire);
router.get('/:id', commentaireCtrl.getOneCommentaire);
router.put('/:id', commentaireCtrl.updateOneCommentaire);
router.delete('/:id', commentaireCtrl.deleteOneCommentaire);

module.exports = router;
