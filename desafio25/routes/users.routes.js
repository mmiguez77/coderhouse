import express from 'express';
import User from '../controllers/Users.js';
import passport from 'passport';
import { validate } from '../passport/auth.js'

const usersRoutes = express.Router();
const user = new User();

usersRoutes.get('/auth/facebook', passport.authenticate('facebook'))
usersRoutes.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/user/main',
    failureRedirect: '/user/login'
}))

usersRoutes.get('/main', validate, user.mainGet)
usersRoutes.get('/logout', user.logout)
usersRoutes.get('/login', user.loginGet)
usersRoutes.get('/register', user.registerGet)


// usersRoutes.post('/register', passport.authenticate("register", {
//     successRedirect: "/user/main",
//     failureRedirect: "/user/register",
//     failureFlash: true,
//     successFlash: true
// }))

// usersRoutes.post('/login', passport.authenticate("fb"))



export default usersRoutes;



