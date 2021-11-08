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
        const token = jwt.sign({ user }, 'TOP_SECRET', { expiresIn: '1d' });

        return res.json({ user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

module.exports = router;
