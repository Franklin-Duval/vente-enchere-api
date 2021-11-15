const Produit = require('../../models/gestionProduit/produit');

exports.getAllProduit = (req, res) => {
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

exports.getOneProduit = (req, res) => {
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

exports.createProduit = (req, res) => {
  const produit = new Produit(req.body);

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

exports.updateOneProduit = (req, res) => {
  const produit = new Produit(req.body);

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

exports.deleteOneProduit = (req, res) => {
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
