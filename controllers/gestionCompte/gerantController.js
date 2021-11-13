const Gerant = require('../../models/gestionCompte/gerant');

exports.getAllGerant = (req, res) => {
  Gerant.find({})
    .populate('user')
    .then((gerants) => {
      res.status(200).json({
        success: true,
        message: 'Les gerants ont été récuppérés avec succès',
        result: gerants,
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

exports.getOneGerant = (req, res) => {
  Gerant.findOne({ _id: req.params.id })
    .populate('user')
    .then((gerant) => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été récuppéré avec succès',
        result: gerant,
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

exports.createGerant = (req, res) => {
  const { nombreAccreditation, user } = req.body;
  const gerant = new Gerant({
    nombreAccreditation,
    user,
  });

  gerant
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le gerant a été enregistré avec succès',
        result: gerant,
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

exports.updateOneGerant = (req, res) => {
  const gerant = new Gerant({
    _id: req.params.id,
    nombreAccreditation: req.body.nombreAccreditation,
    user: req.body.user,
  });

  Gerant.updateOne({ _id: req.params.id }, gerant)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été modifié avec succès',
        result: gerant,
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

exports.deleteOneGerant = (req, res) => {
  Gerant.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le gerant a été supprimé avec succès',
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
