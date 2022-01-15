const express = require('express');
const router = express.Router();

const salleEnchereCtrl = require('../../controllers/gestionEnchere/salleEnchereController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'SALLE ENCHÈRES';
  next();
});

router.get('/', salleEnchereCtrl.getAllSalleEnchere);
router.post('/', logMiddleware.createLog, salleEnchereCtrl.createSalleEnchere);
router.get(
  '/inProgress/',
  salleEnchereCtrl.getAllSalleEnchereBeforeSpecificDate,
);
router.get('/getSalle/:id', salleEnchereCtrl.getSalleEnchereByProduitID);
router.get('/allProduits/:id', salleEnchereCtrl.getAllProduitsInSalleEnchere);

router.get('/:id', salleEnchereCtrl.getOneSalleEnchere);
router.get('/lots/:id', salleEnchereCtrl.getAllSalleEnchereByLot);
router.put(
  '/:id',
  logMiddleware.createLog,
  salleEnchereCtrl.updateOneSalleEnchere,
);
router.delete(
  '/:id',
  logMiddleware.createLog,
  salleEnchereCtrl.deleteOneSalleEnchere,
);

module.exports = router;
