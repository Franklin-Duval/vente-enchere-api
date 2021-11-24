const Compte = require('../../models/gestionCompte/compte');
const EncryptionService = require('../../services/ecryptionService/index');

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

exports.createCompte = async (req, res, next) => {
  const password = await EncryptionService.hashPassword(req.body.password);
  const compte = new Compte({
    email: req.body.email,
    password,
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

exports.updateOneCompte = (req, res) => {
  Compte.updateOne(
    { _id: req.params.id },
    { email: req.body.email, isActivated: false },
  )
    .then((compte) => {
      res.status(200).json({
        success: true,
        message: 'Le compte a été modifié avec succès',
        result: compte.email,
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

exports.activateCompte = (req, res) => {
  const appUrl = req.query.appUrl;
  Compte.updateOne({ _id: req.params.id }, { isActivated: true })
    .then(() => {
      if (appUrl) {
        res.status(200).redirect(appUrl);
      } else {
        res.status(200).json({
          success: true,
          massage: 'Le compte a été activé avec succès',
          result: true,
        });
      }
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

exports.changePassword = async (req, res, next) => {
  Compte.findOne({ _id: req.params.id })
    .then(async (compte) => {
      const isValid = await EncryptionService.comparePassword(
        req.body.oldPassword,
        compte.password,
      );

      if (isValid) {
        compte.password = await EncryptionService.hashPassword(
          req.body.newPassword,
        );
        Compte.updateOne({ _id: req.params.id }, compte)
          .then(() => {
            res.status(200).json({
              success: true,
              massage: 'Le mot de passe a été modifiée avec success',
              result: undefined,
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
      } else {
        res.status(401).json({
          success: false,
          message: 'Le mot de passe est incorrect',
          result: undefined,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({
        success: false,
        message: 'Compte inexistant',
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
