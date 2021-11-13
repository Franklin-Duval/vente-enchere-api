const Commissaire = require('../../models/gestionCompte/commissaire');

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

exports.createCommissaire = (req, res) => {
  const { nombreEnchereOrganisee, user } = req.body;
  const commissaire = new Commissaire({
    nombreEnchereOrganisee,
    user,
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
  const commissaire = new Commissaire({
    _id: req.params.id,
    nombreEnchereOrganisee: req.body.nombreEnchereOrganisee,
    user: req.body.user,
  });

  Commissaire.updateOne({ _id: req.params.id }, commissaire)
    .then(() => {
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
