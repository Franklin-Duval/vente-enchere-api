const Compte = require('../../models/gestionCompte/compte');

exports.getAllCompte = (req, res, next) => {
  Compte.find({})
    .then((comptes) => {
      res.status(200).json({
        success: true,
        message: 'Les comptes ont été récuppérés avec succès',
        result: comptes,
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

exports.getOneCompte = (req, res, next) => {
  Compte.findOne({ _id: req.params.id })
    .then((compte) => {
      res.status(200).json({
        success: true,
        message: 'Le compte a été récuppéré avec succès',
        result: compte,
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

exports.createCompte = (req, res, next) => {
  const { email, password, isActivated } = req.body;
  const compte = new Compte({
    email,
    password,
    isActivated,
  });

  compte
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le compte a été enregistré avec succès',
        result: compte,
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

exports.updateOneCompte = (req, res, next) => {
  const compte = new Compte({
    _id: req.params.id,
    email: req.body.email,
    password: req.body.password,
    isActivated: req.body.isActivated,
  });

  Compte.updateOne({ _id: req.params.id }, compte)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le compte a été modifié avec succès',
        result: compte,
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

exports.deleteOneCompte = (req, res, next) => {
  Compte.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le compte a été supprimé avec succès',
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
