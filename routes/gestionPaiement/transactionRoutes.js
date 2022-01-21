const express = require('express');
const router = express.Router();

const transactionCtrl = require('../../controllers/gestionPaiement/transactionController');

const logMiddleware = require('../../controllers/gestionLog/logController');

router.use((req, res, next) => {
  req.table = 'TRANSACTION';
  next();
});

router.get('/', transactionCtrl.getAllTransaction);
router.post('/', logMiddleware.createLog, transactionCtrl.createTransaction);
router.get('/:id', transactionCtrl.getOneTransaction);
router.put(
  '/:id',
  logMiddleware.createLog,
  transactionCtrl.updateOneTransaction,
);
router.delete(
  '/:id',
  logMiddleware.createLog,
  transactionCtrl.deleteOneTransaction,
);

module.exports = router;
