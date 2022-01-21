const Produit = require('../../models/gestionProduit/produit');
const Lot = require('../../models/gestionProduit/lot');

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
  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description,
    prixMin: req.body.prixMin,
    vendeur: req.body.vendeur,
    category: req.body.category,
    quantite: req.body.quantite,
    estBio: req.body.estBio,
  });

  produit
    .save()
    .then(async (produit) => {
      // ajouter le produit dans le lot
      const lot = await Lot.findOne({ _id: req.body.lotId });
      lot.produits.push(produit);
      lot.prixMin = lot.prixMin + produit.prixMin || 0;
      lot.save();

      res.status(201).json({
        success: true,
        message: 'La produit a été enregistré avec succès',
        result: [produit],
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

exports.addImagesProduit = (req, res) => {
  Produit.updateOne(
    { _id: req.params.id },
    { images: req.uploadedImages?.map((value) => value._id) },
  )
    .then((produit) => {
      res.status(200).json({
        success: true,
        message: 'La produit a été modifié avec succès',
        result: [produit],
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

exports.addFavorisProduit = (req, res) => {
  Produit.findOne({ _id: req.params.id })
    .then((produit) => {
      fav = produit['favoris'];
      fav.push(req.params.userId);
      produit['favoris'] = fav;
      const prod = new Produit({
        nom: produit.nom,
        description: produit.description,
        prixMin: produit.prixMin,
        vendeur: produit.vendeur,
        category: produit.category,
        quantite: produit.quantite,
        estBio: produit.estBio,
        favoris: fav,
      });
      Produit.updateOne({ _id: req.params.id }, prod)
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Le favoris a été ajouté avec succès',
            result: prod,
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
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est produite pour trouver le produit",
        result: undefined,
      });
    });
};

///Modifier cette partie
exports.removeFavorisProduit = (req, res) => {
  Produit.findOne({ _id: req.params.id })
    .then((produit) => {
      fav = produit['favoris'];
      fav = fav.find((element) => element != req.params.userId);
      produit['favoris'] = fav;
      const prod = new Produit({
        nom: produit.nom,
        description: produit.description,
        prixMin: produit.prixMin,
        vendeur: produit.vendeur,
        category: produit.category,
        quantite: produit.quantite,
        estBio: produit.estBio,
        favoris: fav,
      });
      Produit.updateOne({ _id: req.params.id }, prod)
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Le favoris a été ajouté avec succès',
            result: prod,
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
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est produite pour trouver le produit",
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
        result: [produit],
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

exports.getAllProduitByVendeur = (req, res, next) => {
  Produit.find({ vendeur: req.params.id })
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
