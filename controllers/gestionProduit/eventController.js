const Event = require('../../models/gestionProduit/event');
const Lot = require('../../models/gestionProduit/lot');

exports.getAllEvent = (req, res) => {
  Event.find({})
    .populate('vendeur') // to show vendeur object in the json response
    .populate('category') // to show category object in the json response
    .then((events) => {
      res.status(200).json({
        success: true,
        message: 'Les events ont été récuppérés avec succès',
        result: events,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est evente",
        result: undefined,
      });
    });
};

exports.getOneEvent = (req, res) => {
  Event.findOne({ _id: req.params.id })
    .populate('vendeur') // to show vendeur object in the json response
    .populate('category') // to show category object in the json response
    .then((event) => {
      res.status(200).json({
        success: true,
        message: 'La event a été récuppéré avec succès',
        result: event,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est evente",
        result: undefined,
      });
    });
};

exports.createEvent = (req, res) => {
  const event = new Event({
    nom: req.body.nom,
    description: req.body.description,
    periode: req.body.periode,
    vendeur: req.body.vendeur,
    category: req.body.category,
    quantite: req.body.quantite,
    estBio: req.body.estBio,
  });

  event
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'La event a été enregistré avec succès',
        result: event,
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

exports.addImagesEvent = (req, res) => {
  Event.updateOne(
    { _id: req.params.id },
    { images: req.uploadedImages?.map((value) => value._id) },
  )
    .then((event) => {
      res.status(200).json({
        success: true,
        message: 'La event a été modifié avec succès',
        result: [event],
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est evente",
        result: undefined,
      });
    });
};

exports.updateOneEvent = (req, res) => {
  const event = new Event(req.body);

  Event.updateOne({ _id: req.params.id }, event)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La event a été modifié avec succès',
        result: [event],
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est evente",
        result: undefined,
      });
    });
};

exports.deleteOneEvent = (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'La event a été supprimé avec succès',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Une erreur s'est evente",
      });
    });
};

exports.getAllEventByVendeur = (req, res, next) => {
  Event.find({ vendeur: req.params.id })
    .populate('vendeur') // to show vendeur object in the json response
    .populate('category') // to show category object in the json response
    .then((events) => {
      res.status(200).json({
        success: true,
        message: 'Les events ont été récuppérés avec succès',
        result: events,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une erreur s'est evente",
        result: undefined,
      });
    });
};
