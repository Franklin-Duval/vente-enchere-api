const express = require('express');
const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models/gestionCompte/user');
const Client = require('../../models/gestionCompte/client');
const Vendeur = require('../../models/gestionCompte/vendeur');
const Gerant = require('../../models/gestionCompte/gerant');
const Commissaire = require('../../models/gestionCompte/commissaire');
const MailJetService = require('../../services/mailjetService');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  passport.authenticate('signin', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).json({
          success: false,
          message: info.message,
          result: undefined,
        });
      }

      let responseToSend = {
        _id: undefined,
        nom: user.nom,
        prenom: user.prenom,
        telephone: user.telephone,
        email: user.email,
        roles: user.roles,
        compte: user.compte,
        token: undefined,
      };

      if (responseToSend.roles.includes('client')) {
        const userFound = await Client.findOne({ user: user._id }).then(
          (user) => user,
        );
        responseToSend._id = userFound._id;
      } else if (responseToSend.roles.includes('vendeur')) {
        const userFound = await Vendeur.findOne({ user: user._id }).then(
          (user) => user,
        );
        responseToSend._id = userFound._id;
      } else if (responseToSend.roles.includes('gerant')) {
        const userFound = await Gerant.findOne({ user: user._id }).then(
          (user) => user,
        );
        responseToSend._id = userFound._id;
      } else if (responseToSend.roles.includes('commissaire')) {
        const userFound = await Commissaire.findOne({ user: user._id }).then(
          (user) => user,
        );
        responseToSend._id = userFound._id;
      }

      req.login(responseToSend, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign(responseToSend, 'TOP_SECRET', {
          expiresIn: '1d',
        }); // token expiration of 1 day

        responseToSend.token = token;
        return res.json({
          success: true,
          message: info.message,
          result: responseToSend,
        });
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
        return res.status(401).json({
          success: false,
          message: info?.message || err?.message,
          result: undefined,
        });
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
      })
        .then((user) => user)
        .catch((err) => {
          return res.status(401).json({
            success: false,
            message: err?.message,
            result: undefined,
          });
        });

      let responseToSend = {
        _id: undefined,
        nom: newUser.nom,
        prenom: newUser.prenom,
        telephone: newUser.telephone,
        email: newUser.email,
        roles: newUser.roles,
        compte: compte._id,
        user: newUser._id,
        token: undefined,
      };

      if (req.params.person === 'client') {
        const newClient = await Client.create({
          user: newUser._id,
        }).catch((err) => {
          return res.status(401).json({
            success: false,
            message: err?.message,
            result: undefined,
          });
        });
        responseToSend._id = newClient._id;
      } else if (req.params.person === 'vendeur') {
        const newVendeur = await Vendeur.create({
          user: newUser._id,
          specialite: req.body.specialite,
          numeroCNI: req.body.numeroCNI,
        }).catch((err) => {
          return res.status(401).json({
            success: false,
            message: err?.message,
            result: undefined,
          });
        });
        responseToSend._id = newVendeur._id;
      }

      req.login(responseToSend, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign(responseToSend, 'TOP_SECRET', {
          expiresIn: '1d',
        }); // token expiration of 1 day

        await MailJetService.sendValidationEmail(
          {
            Email: responseToSend.email,
            Name: responseToSend.nom,
          },
          `${process.env.APP_URL}api/comptes/activate-compte/${responseToSend.compte}?appUrl=${process.env.FRONTAPP_URL}`,
        );

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
