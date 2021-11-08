const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

router.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('Bad request');
        return res.status(400).json({ error: error.message });
      }
      console.log(req.body);
      return res.json({ user });

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

module.exports = router;
