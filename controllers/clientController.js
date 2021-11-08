const Client = require('../models/client');

exports.getAllClient = (req, res, next) => {
  Client.find({})
    .then((clients) => {
      res.status(200).json({
        success: true,
        message: 'Les utilisateurs ont été récuppérés avec succès',
        result: clients,
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

exports.getOneClient = (req, res, next) => {
  Client.findOne({ _id: req.params.id })
    .then((client) => {
      res.status(200).json({
        success: true,
        message: "L'utilisateur a été récuppéré avec succès",
        result: client,
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

exports.createClient = (req, res, next) => {
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
    numeroCompte,
    numeroMomo,
    nombreProduitsAchetes,
    total_argent_depense,
    dateAjout,
  } = req.body;
  const client = new Client({
    nom,
    prenom,
    adresse,
    pays,
    ville,
    email,
    telephone,
    pseudo,
    password,
    numeroCompte,
    numeroMomo,
    nombreProduitsAchetes,
    total_argent_depense,
    dateAjout,
  });

  client
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: "L'utilisateur a été enregistré avec succès",
        result: client,
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

exports.updateOneClient = (req, res, next) => {
  const client = new Client({
    _id: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    pays: req.params.pays,
    ville: req.params.ville,
    email: req.params.email,
    telephone: req.body.telephone,
    pseudo: req.params.pseudo,
    password: req.params.password,
    numeroCompte: req.params.numeroCompte,
    numeroMomo: req.params.numeroMomo,
    nombreProduitsAchetes: req.params.nombreProduitsAchetes,
    totalArgentDepense: req.params.totalArgentDepense,
    dateAjout: req.body.dateAjout,
  });

  Client.updateOne({ _id: req.params.id }, client)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "L'utilisateur a été modifié avec succès",
        result: client,
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

exports.deleteOneClient = (req, res, next) => {
  Client.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "L'utilisateur a été supprimé avec succès",
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
