const Lot = require('../models/lot');

exports.getAllLot = (req, res, next) => {
  Lot.find({})
    .populate('produits')
    .then((lots) => {
      res.status(200).json({
        success: true,
        message: 'Les lots ont été récuppérés avec succès',
        result: lots,
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

exports.getOneLot = (req, res, next) => {
  Lot.findOne({ _id: req.params.id })
    .populate('produits')
    .then((lot) => {
      res.status(200).json({
        success: true,
        message: 'Le lot a été récuppéré avec succès',
        result: lot,
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

exports.createLot = (req, res, next) => {
  const lot = new Lot({
    prixFinalVente: req.body.prixFinalVente,
    statut: req.body.statut,
    prixMin: req.body.prixMin,
    nonVendu: req.body.nonVendu,
    dateMiseEnchere: req.body.dateMiseEnchere,
    produits: req.body.produits,
    commentaireRefus: req.body.commentaireRefus,
    dateReception: req.body.dateReception,
    dateRefus: req.body.dateRefus,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });

  lot
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le lot a été enregistré avec succès',
        result: lot,
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

exports.updateOneLot = (req, res, next) => {
  const lot = new Lot({
    _id: req.params.id,
    prixFinalVente: req.body.prixFinalVente,
    statut: req.body.statut,
    prixMin: req.body.prixMin,
    nonVendu: req.body.nonVendu,
    dateMiseEnchere: req.body.dateMiseEnchere,
    produits: req.body.produits,
    commentaireRefus: req.body.commentaireRefus,
    dateReception: req.body.dateReception,
    dateRefus: req.body.dateRefus,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });

  Lot.updateOne({ _id: req.params.id }, lot)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le lot a été modifié avec succès',
        result: lot,
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

exports.deleteOneLot = (req, res, next) => {
  Lot.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le lot a été supprimé avec succès',
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
