const Commentaire = require('../../models/gestionEnchere/commentaire');

exports.getAllCommentaire = (req, res, next) => {
  Commentaire.find({})
    .then((commentaires) => {
      res.status(200).json({
        success: true,
        message: 'Les commentaires ont été récuppérés avec succès',
        result: commentaires,
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

exports.getOneCommentaire = (req, res, next) => {
  Commentaire.findOne({ _id: req.params.id })
    .then((commentaire) => {
      res.status(200).json({
        success: true,
        message: 'Le commentaire a été récuppéré avec succès',
        result: commentaire,
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

exports.createCommentaire = (req, res, next) => {
  const commentaire = new Commentaire({
    data: req.body.data,
    salleEnchere: req.body.salleEnchere,
    client: req.body.client,
  });

  commentaire
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le commentaire a été enregistré avec succès',
        result: commentaire,
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

exports.updateOneCommentaire = (req, res) => {
  Commentaire.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((commentaire) => {
      res.status(200).json({
        success: true,
        message: 'Le commentaire a été modifié avec succès',
        result: commentaire,
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

exports.deleteOneCommentaire = (req, res, next) => {
  Commentaire.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La commentaire a été supprimé avec succès',
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
