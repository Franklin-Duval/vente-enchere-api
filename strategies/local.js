const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      console.log(email, password);
      const result = {
        _id: 'd2e552fa121',
        name: 'Talom',
        email: 'franklifrost@gmail.com',
        adresse: 'Douala',
      };
      return done(null, result);
    },
  ),
);
