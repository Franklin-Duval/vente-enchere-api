const FeedBack = require('../../models/gestionEnchere/feedback');

exports.getAllFeedBack = (req, res, next) => {
  FeedBack.find({})
    .then((feedBacks) => {
      res.status(200).json({
        success: true,
        message: 'Les feedBacks ont été récuppérés avec succès',
        result: feedBacks,
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

exports.getOneFeedBack = (req, res, next) => {
  FeedBack.findOne({ _id: req.params.id })
    .then((feedBack) => {
      res.status(200).json({
        success: true,
        message: 'Le feedBack a été récuppéré avec succès',
        result: feedBack,
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

exports.createFeedBack = (req, res, next) => {
  const feedBack = new FeedBack({
    commentaire: req.body.commentaire,
    note: req.body.note,
    lot: req.body.lot,
    client: req.body.client,
  });

  feedBack
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le feedBack a été enregistré avec succès',
        result: feedBack,
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

exports.updateOneFeedBack = (req, res) => {
  FeedBack.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((feedBack) => {
      res.status(200).json({
        success: true,
        message: 'Le feedBack a été modifié avec succès',
        result: feedBack,
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

exports.deleteOneFeedBack = (req, res, next) => {
  FeedBack.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La feedBack a été supprimé avec succès',
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
