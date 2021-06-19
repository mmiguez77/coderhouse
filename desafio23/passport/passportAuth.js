const UserModel = require('../models/userSchema.js')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await UserModel.findOne({ 'username': username });
  done(null, user);
});

passport.use('register', new LocalStrategy({
  // usernameField: 'username',
  // passwordField: 'password',
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    await UserModel.findOne({ 'username': username }, async function (err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, false, { message: 'Usuario ya registrado' });
      }
      if (!user) {
        const username = await req.body.username;
        const password = await req.body.password;
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            return console.log(err)
          } else {
            return password = hash
          }
        })
        
        const newUser = {username, password}
        await newUser.save();
        return done(null, newUser);
      }
    })
  }
  catch (error) {
    console.log(error)
  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const userRegistered = await UserModel.findOne({ 'username': username });

    if (!userRegistered) {
      return done(null, false, { message: 'Usuario y/o Password inválido' });
    }
    if (!userRegistered.passCompare(password)) {
      return done(null, false, { message: 'Usuario y/o Password inválido' });
    }
    return done(null, userRegistered);
  } catch (error) {
    console.log(error)
  }

}));
