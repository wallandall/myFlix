const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const Users = require('../models/userModel');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      Users.findOne({ username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return done(error);
        }
        if (!user) {
          console.log('incorrect username or password.');
          return done(null, false, {
            message: 'Incorrect username or password.'
          });
        }

        if (user.password !== password) {
          console.log('incorrect username or password.');
          return done(null, false, {
            message: 'Incorrect username or password.'
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      return Users.findById(jwtPayload._id)
        .then(user => {
          return done(null, user);
        })
        .catch(error => {
          return done(error);
        });
    }
  )
);
