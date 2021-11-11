const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/gestionCompte/user');
const Compte = require('../models/gestionCompte/compte');
const EncryptionService = require('../services/ecryptionService');

passport.use(
  'signin',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const compte = await Compte.findOne({ email }).then((compte) => compte);
      if (!compte) {
        return done(null, false, {
          message: "L'utilisateur avec cet email n'existe pas",
        });
      }
      const isValid = await EncryptionService.comparePassword(
        password,
        compte.password,
      );
      if (!isValid) {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }

      const user = await User.findOne({ compte: compte._id })
        .populate('compte')
        .then((user) => user);
      return done(null, user, { message: 'Connexion avec succès' });
    },
  ),
);

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const hashedPassword = await EncryptionService.hashPassword(password);
        const compte = await Compte.create({
          email,
          password: hashedPassword,
        }).then((compte) => compte);
        return done(null, compte);
      } catch (error) {
        done(error);
      }
    },
  ),
);

// verify the authenticity of a token: used as a middleware in index.js
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // gets the token from 'Bearer Token' field  in request header
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
