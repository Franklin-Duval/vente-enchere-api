const Produit = require('../../models/gestionProduit/produit');

exports.getAllProduit = (req, res, next) => {
  Produit.find({})
    .populate('vendeur') // to show vendeur object in the json response
    .populate('category') // to show category object in the json response
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

exports.getOneProduit = (req, res, next) => {
  Produit.findOne({ _id: req.params.id })
    .populate('vendeur') // to show vendeur object in the json response
    .populate('category') // to show category object in the json response
    .then((produit) => {
      res.status(200).json({
        success: true,
        message: 'La produit a été récuppéré avec succès',
        result: produit,
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

exports.createProduit = (req, res, next) => {
  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description,
    prixMin: req.body.prixMin,
    vendeur: req.body.vendeur,
    category: req.body.category,
    images: req.uploadedImages.map((value) => value._id),
    estBio: req.body.estBio,
    statut: req.body.statut,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });

  produit
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'La produit a été enregistré avec succès',
        result: produit,
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

exports.updateOneProduit = (req, res, next) => {
  const produit = new Produit({
    _id: req.params.id,
    nom: req.body.nom,
    description: req.body.description,
    prixMin: req.body.prixMin,
    vendeur: req.body.vendeur,
    category: req.body.category,
    images: req.uploadedImages.map((value) => value._id),
    estBio: req.body.estBio,
    statut: req.body.statut,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });

  Produit.updateOne({ _id: req.params.id }, produit)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La produit a été modifié avec succès',
        result: produit,
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

exports.deleteOneProduit = (req, res, next) => {
  Produit.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La produit a été supprimé avec succès',
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
