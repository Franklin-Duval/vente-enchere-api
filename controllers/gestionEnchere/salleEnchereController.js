const SalleEnchere = require('../../models/gestionEnchere/salleEnchere');

exports.getAllSalleEnchere = (req, res, next) => {
  SalleEnchere.find({})
    .then((salleEncheres) => {
      res.status(200).json({
        success: true,
        message: 'Les salleEncheres ont été récuppérés avec succès',
        result: salleEncheres,
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

exports.getOneSalleEnchere = (req, res, next) => {
  SalleEnchere.findOne({ _id: req.params.id })
    .then((salleEnchere) => {
      res.status(200).json({
        success: true,
        message: 'La salleEnchere a été récuppéré avec succès',
        result: salleEnchere,
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

exports.createSalleEnchere = (req, res, next) => {
  const salleEnchere = new SalleEnchere({
    dateOuverture: req.body.dateOuverture,
    duree: req.body.duree,
    statut: req.body.statut,
  });

  salleEnchere
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le salleEnchere a été enregistré avec succès',
        result: salleEnchere,
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

exports.updateOneSalleEnchere = (req, res) => {
  SalleEnchere.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((salleEnchere) => {
      res.status(200).json({
        success: true,
        message: 'Le salleEnchere a été modifié avec succès',
        result: salleEnchere,
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

exports.deleteOneSalleEnchere = (req, res, next) => {
  SalleEnchere.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La salleEnchere a été supprimé avec succès',
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
