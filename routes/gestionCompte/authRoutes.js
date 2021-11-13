const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/gestionCompte/user');
const Client = require('../../models/gestionCompte/client');
const Vendeur = require('../../models/gestionCompte/vendeur');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  passport.authenticate('signin', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign({ user }, 'TOP_SECRET', { expiresIn: '1d' }); // token expiration of 1 day

        return res.json({ user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/signup/:person', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        const error = new Error('Bad request');
        return res.status(400).json({ error: error.message });
      }
      const compte = user; //le compte est renvoyé par le middleware de passport dans la variable 'user'

      const newUser = await User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        roles: req.body.roles,
        localisation: req.body.localisation,
        compte: compte._id,
      }).then((user) => user);

      let responseToSend = {
        _id: undefined,
        nom: newUser.nom,
        prenom: newUser.prenom,
        telephone: newUser.telephone,
        email: newUser.email,
        roles: newUser.roles,
        compte: compte._id,
        token: undefined,
      };

      if (req.params.person === 'client') {
        const newClient = await Client.create({
          user: newUser._id,
        });
        responseToSend._id = newClient._id;
      } else if (req.params.person === 'vendeur') {
        const newVendeur = await Vendeur.create({
          user: newUser._id,
          specialite: req.body.specialite,
          numeroCNI: req.body.numeroCNI,
        });
        responseToSend._id = newVendeur._id;
      }

      req.login(responseToSend, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign({ user: responseToSend }, 'TOP_SECRET', {
          expiresIn: '1d',
        }); // token expiration of 1 day

        responseToSend.token = token;
        return res.json({
          success: true,
          message: 'Le compte à été créé avec succès',
          result: responseToSend,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
