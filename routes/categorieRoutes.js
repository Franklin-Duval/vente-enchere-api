const express = require('express');
const router = express.Router();

const categorieCtrl = require('../controllers/categorieController');

router.get('/', categorieCtrl.getAllCategorie);
router.post('/', categorieCtrl.createCategorie);
router.get('/:id', categorieCtrl.getOneCategorie);
router.put('/:id', categorieCtrl.updateOneCategorie);
router.delete('/:id', categorieCtrl.deleteOneCategorie);

module.exports = router;
