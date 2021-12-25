const Participation = require('../../models/gestionEnchere/participation');

exports.getAllParticipation = (req, res) => {
  Participation.find({})
    .then((participations) => {
      res.status(200).json({
        success: true,
        message: 'Les participations ont été récuppérés avec succès',
        result: participations,
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

exports.getOneParticipation = (req, res) => {
  Participation.findOne({ _id: req.params.id })
    .then((participation) => {
      res.status(200).json({
        success: true,
        message: 'La participation a été récuppéré avec succès',
        result: participation,
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

exports.createParticipation = (req, res) => {
  const participation = new Participation(req.body);

  participation
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'La participation a été enregistré avec succès',
        result: participation,
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

exports.updateOneParticipation = (req, res) => {
  Participation.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((participation) => {
      res.status(200).json({
        success: true,
        message: 'La participation a été modifié avec succès',
        result: participation,
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

exports.deleteOneParticipation = (req, res) => {
  Participation.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La participation a été supprimé avec succès',
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
