const LocalStrategy = require('passport-local');
const passport = require('passport');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);
    const result = { name: 'Talom', email: 'franklifrost@gmail.com' };
    return done(null, result);
  }),
);
