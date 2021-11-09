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
  const { email, pwd, isActivated } = req.body;
  const password = await EncryptionService.hashPassword(pwd);
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
  /* const compte = new Compte({
    _id: req.params.id,
    email: req.body.email,
    isActivated: false,
  }); */

  Compte.updateOne(
    { _id: req.params.id },
    { email: req.body.email, isActivated: false },
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le compte a été modifié avec succès',
        result: { email: req.body.email, isActivated: false },
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

exports.activateOneCompte = (req, res, next) => {
  Compte.updateOne({ _id: req.params.id }, { isActivated: true })
    .then(() => {
      res.status(200).json({
        success: true,
        massage: 'Le compte a été activée',
        result: true,
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

exports.changePassword = async (req, res, next) => {
  Compte.findOne({ _id: req.params.id })
    .then((compte) => {
      const val = EncryptionService.comparePassword(
        req.body.oldPassword,
        compte.password,
      );
      if (val) {
        Compte.updateOne(
          { _id: req.params.id },
          { password: req.body.newPassword },
        )
          .then(() => {
            res.status(200).json({
              success: true,
              massage: 'Le mot de passe a été modifiée avec success',
              result: {
                oldPassword: req.body.oldPassword,
                newPassword: newPassword,
              },
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
        res.status(500).json({
          success: false,
          message: 'Le mot de passe est incorrect',
          result: undefined,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Compte inexistant',
        result: undefined,
      });
    });
  /* Compte.updateOne(
    { _id: req.params.id },
    { oldPassword: req.body.oldPassword, newPassword: newPassword },
  )
    .then(() => {
      res.status(200).json({
        success: true,
        massage: 'Le mot de passe a été modifiée avec success',
        result: { oldPassword: req.body.oldPassword, newPassword: newPassword },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    }); */
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
