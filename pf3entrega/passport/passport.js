import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/userSchema.js';
import mail from '../helpers/nodemailer.js';
import logger from '../config/winston.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    const { username, password, email, address, age, phone, avatar } = req.body
    const userInDb = await UserModel.findOne({ email: email });
    //console.log(email, userInDb.email);
    if (userInDb.email == email) {
      return done(null, false, ('Usuario ya registrado'))
    } else {
      const newUser = new UserModel({ username, password, email, address, age, phone, avatar })
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      let text = (`Datos del nuevo registro: 
      - Username: ${newUser.username},
      - Email: ${newUser.email},
      - Address: ${newUser.address},
      - Age: ${newUser.age},
      - Phone: ${newUser.phone},
      - avatar: ${newUser.avatar}
      `)
      mail(/*newUser.email*/'blaze.mccullough70@ethereal.email', 'Nuevo Registo', text)
      return done(null, newUser, req.flash('success', 'Usuario registrado con éxito'));
    }
  }
  catch (error) {
    logger.error.error(error);
  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const { email, password } = req.body
    const userRegistered = await UserModel.findOne({ email: email });

    if (!userRegistered) {
      return done(null, false, req.flash('error', 'Email y/o Password inválido'));
    } else {
      const matchPassword = await userRegistered.checkPassword(password);
      if (matchPassword) {
        return done(null, userRegistered, req.flash('welcome', `${email}`));
      } else {
        return done(null, false, req.flash('error', 'Usuario y/o Password inválido'));
      }
    }
  } catch (error) {
    logger.error.error(error);
  }
}));

export default passport