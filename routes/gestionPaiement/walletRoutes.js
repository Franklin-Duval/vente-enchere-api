const express = require('express');
const router = express.Router();

const walletCtrl = require('../../controllers/gestionPaiement/walletController');

const logMiddleware = require('../../controllers/gestionLog/logController');

router.use((req, res, next) => {
  req.table = 'WALLET';
  next();
});

router.get('/', walletCtrl.getAllWallet);
router.post('/', logMiddleware.createLog, walletCtrl.createWallet);
router.get('/:id', walletCtrl.getOneWallet);
router.put('/:id', logMiddleware.createLog, walletCtrl.updateOneWallet);
router.delete('/:id', logMiddleware.createLog, walletCtrl.deleteOneWallet);
router.post(
  '/increase/:id',
  logMiddleware.createLog,
  walletCtrl.increaseAmountInWallet,
);
router.get(
  '/retrieve/:id',
  logMiddleware.createLog,
  walletCtrl.retrieveAmountInWallet,
);
router.get('/pay/:id', logMiddleware.createLog, walletCtrl.payVendeur);

module.exports = router;
