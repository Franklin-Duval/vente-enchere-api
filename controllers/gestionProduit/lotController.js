const Lot = require('../../models/gestionProduit/lot');

exports.getAllLot = (req, res) => {
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

exports.getOneLot = (req, res) => {
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

exports.createLot = (req, res) => {
  const lot = new Lot({
    numeroLot: Math.round(Math.random() * (999999 - 100000)), //generer un nombre entre 100,000 et 999,999
    statut: 'en_attente_selection',
    prixMin: 0,
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

exports.updateOneLot = (req, res) => {
  const lot = new Lot(req.body);

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

exports.deleteOneLot = (req, res) => {
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
