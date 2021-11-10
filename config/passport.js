//Strategy will decrypt the token and read the payload
const JwtStrategy = require('passport-jwt').Strategy;
//ExtractJwt retrieve the token from the request
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (payload, done) =>{
    User.findById(payload.id)
    .then(user => {
      if(user){
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
  }))
}
