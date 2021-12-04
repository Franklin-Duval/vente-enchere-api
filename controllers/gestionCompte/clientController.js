const Client = require('../../models/gestionCompte/client');

exports.getAllClient = (req, res) => {
  Client.find({})
    .populate('user')
    .then((clients) => {
      res.status(200).json({
        success: true,
        message: 'Les clients ont été récuppérés avec succès',
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

exports.getOneClient = (req, res) => {
  Client.findOne({ _id: req.params.id })
    .populate('user')
    .then((client) => {
      res.status(200).json({
        success: true,
        message: 'Le client a été récuppéré avec succès',
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

exports.createClient = (req, res) => {
  const client = new Client(req.body);

  client
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le client a été enregistré avec succès',
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

exports.updateOneClient = (req, res) => {
  Client.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le client a été modifié avec succès',
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

exports.deleteOneClient = (req, res) => {
  Client.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le client a été supprimé avec succès',
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
