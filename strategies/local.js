const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');

passport.use(
  'signin',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      // try {
      //   const user = await UserModel.findOne({ email });
      //   if (!user) {
      //     return done(null, false, { message: 'User not found' });
      //   }

      //   const validate = await user.isValidPassword(password);
      //   if (!validate) {
      //     return done(null, false, { message: 'Wrong Password' });
      //   }
      //   return done(null, user, { message: 'Logged in Successfully' });
      // } catch (error) {
      //   return done(error);
      // }
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

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      console.log(email, password);
      // try {
      //   const user = await UserModel.create({ email, password });

      //   return done(null, user);
      // } catch (error) {
      //   done(error);
      // }
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

// verify the authenticity of a token: used as a middleware
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
