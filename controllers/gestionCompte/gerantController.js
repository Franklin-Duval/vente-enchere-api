const Gerant = require('../../models/gestionCompte/gerant');
const Compte = require('../../models/gestionCompte/compte');
const User = require('../../models/gestionCompte/user');
const EncryptionService = require('../../services/ecryptionService');

exports.getAllGerant = (req, res) => {
  Gerant.find({})
    .populate('user')
    .then((gerants) => {
      res.status(200).json({
        success: true,
        message: 'Les gerants ont été récuppérés avec succès',
        result: gerants,
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

exports.getOneGerant = (req, res) => {
  Gerant.findOne({ _id: req.params.id })
    .populate('user')
    .then((gerant) => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été récuppéré avec succès',
        result: gerant,
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

exports.createGerant = async (req, res) => {
  // to create a gérant, we create 'compte', 'user' and 'gerant'
  const hashedPassword = await EncryptionService.hashPassword(
    req.body.password,
  );
  const compte = await Compte.create({
    email: req.body.email,
    password: hashedPassword,
    isActivated: true,
  })
    .then((compte) => compte)
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        message: err?.message,
        result: undefined,
      });
    });

  const newUser = await User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    telephone: req.body.telephone,
    email: req.body.email,
    roles: req.body.roles,
    localisation: req.body.localisation,
    compte: compte._id,
  })
    .then((user) => user)
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: err?.message,
        result: undefined,
      });
    });

  const gerant = new Gerant({
    nombreAccreditation: 0,
    user: newUser,
  });

  gerant
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le gerant a été enregistré avec succès',
        result: gerant,
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

exports.updateOneGerant = (req, res) => {
  const gerant = new Gerant({
    _id: req.params.id,
    nombreAccreditation: req.body.nombreAccreditation,
    user: req.body.user,
  });

  Gerant.updateOne({ _id: req.params.id }, gerant)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été modifié avec succès',
        result: gerant,
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

exports.deleteOneGerant = (req, res) => {
  Gerant.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été supprimé avec succès',
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
