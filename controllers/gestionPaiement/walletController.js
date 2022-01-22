const Wallet = require('../../models/gestionPaiement/wallet');

exports.getAllWallet = (req, res) => {
  Wallet.find({})
    .then((wallets) => {
      res.status(200).json({
        success: true,
        message: 'Les wallets ont été récuppérés avec succès',
        result: wallets,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    });
};

exports.getOneWallet = (req, res) => {
  Wallet.findOne({ _id: req.params.id })
    .then((wallet) => {
      res.status(200).json({
        success: true,
        message: 'Le wallet a été récuppéré avec succès',
        result: wallet,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    });
};

exports.createWallet = (req, res) => {
  const wallet = new Wallet({
    amount: req.body.amount,
    user: req.body.user,
  });
  wallet
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le wallet a été enregistré avec succès',
        result: wallet,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    });
};

exports.updateOneWallet = (req, res) => {
  Wallet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((wallet) => {
      res.status(200).json({
        success: true,
        message: 'Le wallet a été modifié avec succès',
        result: wallet,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    });
};

exports.deleteOneWallet = (req, res) => {
  Wallet.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le wallet a été supprimé avec succès',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est produite",
      });
    });
};
