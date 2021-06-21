import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/userSchema.js'

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use('register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    const { username, password } = req.body
    const userInDb = await UserModel.findOne({ username: username });
    if (userInDb) {
      return done(null, false, console.log({ message: 'Usuario ya registrado' }))
    } else {
      const newUser = new UserModel({ username, password })
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      return done(null, newUser, console.log({ message: 'Usuario registrado con éxito' }));
    }
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
    const { username, password } = req.body
    const userRegistered = await UserModel.findOne({ username: username });

    if (!userRegistered) {
      return done(null, false, console.log({ message: 'Usuario y/o Password inválido' }));
    } else {
      const matchPassword = await userRegistered.checkPassword(password);
      if (matchPassword) {
        return done(null, userRegistered, console.log({message: 'Bienvenido' }));
      } else {
        return done(null, false, console.log({ message: 'Usuario y/o Password inválido' }));
      }
    }
  } catch (error) {
    console.log(error)
  }
}));

export default passport