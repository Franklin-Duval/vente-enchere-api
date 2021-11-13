const User = require('../../models/gestionCompte/user');

exports.getAllUser = (req, res) => {
  User.find({})
    .populate('compte')
    .then((users) => {
      res.status(200).json({
        success: true,
        message: 'Les users ont été récuppérés avec succès',
        result: users,
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

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate('compte')
    .then((user) => {
      res.status(200).json({
        success: true,
        message: 'Le user a été récuppéré avec succès',
        result: user,
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

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le user a été enregistré avec succès',
        result: user,
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

exports.updateOneUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le user a été modifié avec succès',
        result: user,
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

exports.deleteOneUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le user a été supprimé avec succès',
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
