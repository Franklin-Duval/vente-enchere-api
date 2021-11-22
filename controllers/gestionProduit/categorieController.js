const Categorie = require('../../models/gestionProduit/categorie');

exports.getAllCategorie = (req, res, next) => {
  Categorie.find({})
    .then((categories) => {
      res.status(200).json({
        success: true,
        message: 'Les categories ont été récuppérés avec succès',
        result: categories,
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

exports.getOneCategorie = (req, res, next) => {
  Categorie.findOne({ _id: req.params.id })
    .then((categorie) => {
      res.status(200).json({
        success: true,
        message: 'La categorie a été récuppéré avec succès',
        result: categorie,
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

exports.createCategorie = (req, res, next) => {
  const categorie = new Categorie({
    nom: req.body.nom,
    description: req.body.description,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });
  categorie
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'La categorie a été enregistré avec succès',
        result: categorie,
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

exports.updateOneCategorie = (req, res, next) => {
  const categorie = new Categorie({
    _id: req.params.id,
    nom: req.body.nom,
    description: req.body.description,
    dateCreation: req.body.dateCreation,
    dateModification: req.body.dateModification,
    dateSuppression: req.body.dateSuppression,
  });

  Categorie.updateOne({ _id: req.params.id }, categorie)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La categorie a été modifié avec succès',
        result: categorie,
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

exports.deleteOneCategorie = (req, res, next) => {
  Categorie.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La categorie a été supprimé avec succès',
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
