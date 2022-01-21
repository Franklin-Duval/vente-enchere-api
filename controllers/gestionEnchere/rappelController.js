const Rappel = require('../../models/gestionEnchere/rappel');

exports.getAllRappel = (req, res) => {
  Rappel.find({})
    .then((rappels) => {
      res.status(200).json({
        success: true,
        message: 'Les rappels ont été récuppérés avec succès',
        result: rappels,
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

exports.getOneRappel = (req, res) => {
  Rappel.findOne({ _id: req.params.id })
    .then((rappel) => {
      res.status(200).json({
        success: true,
        message: 'Le rappel a été récuppéré avec succès',
        result: rappel,
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

exports.createRappel = (req, res) => {
  const rappel = new Rappel({
    dateAjout: req.body.dateAjout,
    produit: req.body.produit,
    user: req.body.user,
  });

  rappel
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le rappel a été enregistré avec succès',
        result: rappel,
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

exports.updateOneRappel = (req, res) => {
  Rappel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((rappel) => {
      res.status(200).json({
        success: true,
        message: 'Le rappel a été modifié avec succès',
        result: rappel,
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

exports.deleteOneRappel = (req, res) => {
  Rappel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La rappel a été supprimé avec succès',
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
