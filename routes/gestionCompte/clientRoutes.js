const express = require('express');
const router = express.Router();

const clientCtrl = require('../../controllers/gestionCompte/clientController');

router.get('/', clientCtrl.getAllClient);
router.post('/', clientCtrl.createClient);
router.get('/:id', clientCtrl.getOneClient);
router.put('/:id', clientCtrl.updateOneClient);
router.delete('/:id', clientCtrl.deleteOneClient);

module.exports = router;
