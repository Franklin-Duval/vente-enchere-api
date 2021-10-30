const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      res.json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    } else {
      res.json({
        success: false,
        message: 'Les utilisateurs ont été récuppérés avec succès',
        result: users,
      });
    }
  });
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Une erreur s'est produite",
        result: undefined,
      });
    } else {
      res.json({
        success: false,
        message: "L'utilisateur a été récuppéré avec succès",
        result: user,
      });
    }
  });
});

router.post('/', (req, res) => {
  const { nom, prenom, adresse, constact, dateAjout } = req.body;

  const user = new User({
    nom,
    prenom,
    adresse,
    constact,
    dateAjout,
  });

  try {
    user.save();
    res.json({
      success: true,
      message: "L'utilisateur a été enregistré avec succès",
      result: user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Une erreur s'est produite",
      result: undefined,
    });
  }
});

module.exports = router;
