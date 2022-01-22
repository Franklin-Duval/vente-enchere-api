const Transaction = require('../../models/gestionPaiement/transaction');
const mongoose = require('mongoose');

exports.getAllTransaction = (req, res) => {
  Transaction.find({})
    .populate('wallet')
    .then((transactions) => {
      res.status(200).json({
        success: true,
        message: 'Les transactions ont été récuppérés avec succès',
        result: transactions,
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

exports.getOneTransaction = (req, res) => {
  Transaction.findOne({ _id: req.params.id })
    .populate('wallet')
    .then((transaction) => {
      res.status(200).json({
        success: true,
        message: 'La transaction a été récuppéré avec succès',
        result: transaction,
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

exports.createTransaction = (req, res) => {
  const transaction = new Transaction({
    montant: req.body.montant,
    date: req.body.date,
    type: req.body.type,
    wallet: req.body.wallet,
  });
  transaction
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le transaction a été enregistré avec succès',
        result: transaction,
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

exports.updateOneTransaction = (req, res) => {
  Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((transaction) => {
      res.status(200).json({
        success: true,
        message: 'Le transaction a été modifié avec succès',
        result: transaction,
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

exports.deleteOneTransaction = (req, res) => {
  Transaction.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le transaction a été supprimé avec succès',
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
