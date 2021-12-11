const SalleEnchere = require('../../models/gestionEnchere/salleEnchere');
const Lot = require('../../models/gestionProduit/lot');
const Produit = require('../../models/gestionProduit/produit');

const mongoose = require('mongoose');

exports.getAllSalleEnchere = (req, res, next) => {
  SalleEnchere.find({})
    .then((salleEncheres) => {
      res.status(200).json({
        success: true,
        message: 'Les salleEncheres ont été récuppérés avec succès',
        result: salleEncheres,
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

exports.getOneSalleEnchere = (req, res, next) => {
  SalleEnchere.findOne({ _id: req.params.id })
    .then((salleEnchere) => {
      res.status(200).json({
        success: true,
        message: 'La salleEnchere a été récuppéré avec succès',
        result: salleEnchere,
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

exports.createSalleEnchere = (req, res, next) => {
  const salleEnchere = new SalleEnchere({
    dateOuverture: req.body.dateOuverture,
    duree: req.body.duree,
    statut: req.body.statut,
  });

  salleEnchere
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le salleEnchere a été enregistré avec succès',
        result: salleEnchere,
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

exports.getAllSalleEnchereByLot = (req, res, next) => {
  SalleEnchere.find({ lots: mongoose.Types.ObjectId(req.params.id) })
    .then((salleEncheres) => {
      res.status(200).json({
        success: true,
        message: 'Les salles enchères ont été récuppérés avec succès',
        result: salleEncheres,
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

exports.updateOneSalleEnchere = (req, res) => {
  SalleEnchere.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((salleEnchere) => {
      res.status(200).json({
        success: true,
        message: 'Le salleEnchere a été modifié avec succès',
        result: salleEnchere,
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

exports.deleteOneSalleEnchere = (req, res, next) => {
  SalleEnchere.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La salleEnchere a été supprimé avec succès',
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

exports.getAllSalleEnchereBeforeSpecificDate = (req, res, next) => {
  SalleEnchere.find({ dateOuverture: { $gte: Date(Date.now()) } })
    .then((salleEncheres) => {
      res.status(200).json({
        success: true,
        message: 'Les salles enchères ont été récuppérés avec succès',
        result: salleEncheres,
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

exports.getAllProduitsInSalleEnchere = async (req, res, next) => {
  let arrayProduitsIDs = [];

  const salles = await SalleEnchere.findOne({ _id: req.params.id });
  const lots = await Lot.find({ _id: { $in: salles.lots } });

  arrayProduitsIDs = lots.map((lot) => lot.produits);
  arrayProduitsIDs = [].concat.apply([], arrayProduitsIDs);

  Produit.find({ _id: { $in: arrayProduitsIDs } })
    .then((produits) => {
      res.status(200).json({
        success: true,
        message: 'Les produits ont été récuppérés avec succès',
        result: produits,
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

exports.getSalleEnchereByProduitID = async (req, res, next) => {
  const lotArrays = await Lot.find({
    produits: mongoose.Types.ObjectId(req.params.id),
  });

  let lotID = lotArrays[0]._id;

  SalleEnchere.find({ lots: lotID })
    .then((salleEnchere) => {
      res.status(200).json({
        success: true,
        message: 'Les salles enchères ont été récuppérés avec succès',
        result: salleEnchere,
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
