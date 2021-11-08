const CommissairePrisseur = require('../models/commissairePrisseur');

exports.getAllCommissairePrisseur = (req, res, next) => {
  CommissairePrisseur.find({})
    .then((commissairePrisseurs) => {
      res.status(200).json({
        success: true,
        message: 'Les commissaires priseur ont été récuppérés avec succès',
        result: commissairePrisseurs,
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

exports.getOneCommissairePrisseur = (req, res, next) => {
  CommissairePrisseur.findOne({ _id: req.params.id })
    .then((commissairePrisseur) => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été récuppéré avec succès',
        result: commissairePrisseur,
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

exports.createCommissairePrisseur = (req, res, next) => {
  const {
    nom,
    prenom,
    adresse,
    pays,
    ville,
    email,
    telephone,
    pseudo,
    password,
    nombreEnchereOrganisee,
    dateAjout,
  } = req.body;
  const commissairePrisseur = new CommissairePrisseur({
    nom,
    prenom,
    adresse,
    pays,
    ville,
    email,
    telephone,
    pseudo,
    password,
    nombreEnchereOrganisee,
    dateAjout,
  });

  commissairePrisseur
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le commissaire priseur a été enregistré avec succès',
        result: commissairePrisseur,
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

exports.updateOneCommissairePrisseur = (req, res, next) => {
  const commissairePrisseur = new CommissairePrisseur({
    _id: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    pays: req.body.pays,
    ville: req.body.ville,
    email: req.body.email,
    telephone: req.body.telephone,
    pseudo: req.body.pseudo,
    password: req.body.password,
    nombreEnchereOrganisee: req.body.nombreEnchereOrganisee,
    dateAjout: req.body.dateAjout,
  });

  CommissairePrisseur.updateOne({ _id: req.params.id }, commissairePrisseur)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été modifié avec succès',
        result: commissairePrisseur,
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

exports.deleteOneCommissairePrisseur = (req, res, next) => {
  CommissairePrisseur.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été supprimé avec succès',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est produite",
      });
    });
};
