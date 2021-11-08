const CommissairePriseur = require('../../models/gestionCompte/commissaire');

exports.getAllCommissairePriseur = (req, res, next) => {
  CommissairePriseur.find({})
    .then((commissairePriseurs) => {
      res.status(200).json({
        success: true,
        message: 'Les commissaires priseur ont été récuppérés avec succès',
        result: commissairePriseurs,
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

exports.getOneCommissairePriseur = (req, res, next) => {
  CommissairePriseur.findOne({ _id: req.params.id })
    .then((commissairePriseur) => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été récuppéré avec succès',
        result: commissairePriseur,
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

exports.createCommissairePriseur = (req, res, next) => {
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
  const commissairePriseur = new CommissairePriseur({
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

  commissairePriseur
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le commissaire priseur a été enregistré avec succès',
        result: commissairePriseur,
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

exports.updateOneCommissairePriseur = (req, res, next) => {
  const commissairePriseur = new CommissairePriseur({
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

  CommissairePriseur.updateOne({ _id: req.params.id }, commissairePriseur)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été modifié avec succès',
        result: commissairePriseur,
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

exports.deleteOneCommissairePriseur = (req, res, next) => {
  CommissairePriseur.deleteOne({ _id: req.params.id })
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
