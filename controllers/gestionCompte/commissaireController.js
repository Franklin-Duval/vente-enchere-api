const Commissaire = require('../../models/gestionCompte/commissaire');
const Compte = require('../../models/gestionCompte/compte');
const User = require('../../models/gestionCompte/user');
const EncryptionService = require('../../services/ecryptionService');

exports.getAllCommissaire = (req, res) => {
  Commissaire.find({})
    .populate('user')
    .then((commissaires) => {
      res.status(200).json({
        success: true,
        message: 'Les commissaires priseur ont été récuppérés avec succès',
        result: commissaires,
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

exports.getOneCommissaire = (req, res) => {
  Commissaire.findOne({ _id: req.params.id })
    .populate('user')
    .then((commissaire) => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été récuppéré avec succès',
        result: commissaire,
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

exports.createCommissaire = async (req, res) => {
  // to create a commissaire, we create 'compte', 'user' and 'commissaire'
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

  const commissaire = new Commissaire({
    nombreEnchereOrganisee: 0,
    user: newUser,
  });

  commissaire
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le commissaire priseur a été enregistré avec succès',
        result: commissaire,
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

exports.updateOneCommissaire = (req, res) => {
  Commissaire.updateOne({ _id: req.params.id }, req.body)
    .then((commissaire) => {
      res.status(200).json({
        success: true,
        message: 'Le commissaire priseur a été modifié avec succès',
        result: commissaire,
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

exports.deleteOneCommissaire = (req, res) => {
  Commissaire.deleteOne({ _id: req.params.id })
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
