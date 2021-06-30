import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config/index.js';
// import UserModel from '../models/userSchema.js'

const FACEBOOK_CLIENT_ID = config.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = config.FACEBOOK_CLIENT_SECRET;

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
});


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, userProfile, done) {
  console.log(userProfile);
  return done(null, userProfile);
}));

export default passport



// passport.use('register', new LocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async function (req, username, password, done) {
//   try {
//     const { username, password } = req.body
//     const userInDb = await UserModel.findOne({ username: username });
//     if (userInDb) {
//       return done(null, false, req.flash('error', 'Usuario ya registrado'))
//     } else {
//       const newUser = new UserModel({ username, password })
//       newUser.password = await newUser.encryptPassword(password);
//       await newUser.save();
//       return done(null, newUser, req.flash('success', 'Usuario registrado con éxito'));
//     }
//   }
//   catch (error) {
//     console.log(error)
//   }
// }))