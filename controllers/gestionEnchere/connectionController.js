const Connection = require('../../models/gestionEnchere/connection');
const mongoose = require('mongoose');

exports.getAllConnection = (req, res) => {
  Connection.find({})
    .then((connections) => {
      res.status(200).json({
        success: true,
        message: 'Les connections ont été récuppérés avec succès',
        result: connections,
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

exports.getOneConnection = (req, res) => {
  Connection.findOne({ _id: req.params.id })
    .then((connection) => {
      res.status(200).json({
        success: true,
        message: 'La connection a été récuppéré avec succès',
        result: connection,
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

exports.createConnection = (req, res) => {
  const connection = new Connection({
    user: req.body.user,
    salleEnchere: req.body.salleEnchere,
  });

  connection
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'La connection a été enregistré avec succès',
        result: connection,
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

exports.updateOneConnection = (req, res) => {
  Connection.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((connection) => {
      res.status(200).json({
        success: true,
        message: 'La connection a été modifié avec succès',
        result: connection,
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

exports.deleteOneConnection = (req, res) => {
  Connection.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La connection a été supprimé avec succès',
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
