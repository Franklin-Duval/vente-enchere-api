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
  const { nombreEnchereOrganisee, user } = req.body;
  const commissairePriseur = new CommissairePriseur({
    nombreEnchereOrganisee,
    user,
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
    nombreEnchereOrganisee: req.body.nombreEnchereOrganisee,
    user: req.body.user,
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
