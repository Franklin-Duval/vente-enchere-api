const express = require('express');
const router = express.Router();

const imageMiddleware = require('../../middlewares/imageMiddleware');

const produitCtrl = require('../../controllers/gestionProduit/produitController');

router.get('/', produitCtrl.getAllProduit);
router.post('/', imageMiddleware, produitCtrl.createProduit);
router.get('/:id', produitCtrl.getOneProduit);
router.put('/:id', imageMiddleware, produitCtrl.updateOneProduit);
router.delete('/:id', produitCtrl.deleteOneProduit);

module.exports = router;
