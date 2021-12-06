const Vendeur = require('../../models/gestionCompte/vendeur');

exports.getAllVendeur = (req, res) => {
  Vendeur.find({})
    .populate('user')
    .then((vendeurs) => {
      res.status(200).json({
        success: true,
        message: 'Les vendeurs ont été récuppérés avec succès',
        result: vendeurs,
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

exports.getOneVendeur = (req, res) => {
  Vendeur.findOne({ _id: req.params.id })
    .populate('user')
    .then((vendeur) => {
      res.status(200).json({
        success: true,
        message: 'Le vendeur a été récuppéré avec succès',
        result: vendeur,
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

exports.createVendeur = (req, res) => {
  const {
    accreditation,
    numeroCNI,
    specialite,
    chiffreAffaire,
    nombreLotsVendu,
    user,
    gerant,
  } = req.body;
  const vendeur = new Vendeur({
    accreditation,
    numeroCNI,
    specialite,
    chiffreAffaire,
    nombreLotsVendu,
    user,
    gerant,
  });

  vendeur
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Le vendeur a été enregistré avec succès',
        result: vendeur,
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

exports.updateOneVendeur = (req, res) => {
  Vendeur.updateOne({ _id: req.params.id }, req.body)
    .then((vendeur) => {
      res.status(200).json({
        success: true,
        message: 'Le vendeur a été modifié avec succès',
        result: vendeur,
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

exports.deleteOneVendeur = (req, res) => {
  Vendeur.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Le vendeur a été supprimé avec succès',
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
