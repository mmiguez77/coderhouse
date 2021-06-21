import express from 'express';
import User from '../controllers/Users.js';
import passport from 'passport';
import { validate } from '../passport/auth.js'
const usersRoutes = express.Router();
const user = new User();

usersRoutes.get('/register', user.registerGet)
usersRoutes.get('/main', validate, user.mainGet)
usersRoutes.get('/logout', user.logout)
usersRoutes.get('/login', user.loginGet)

usersRoutes.post('/register', passport.authenticate("register", {
    successRedirect: "/user/login",
    failureRedirect: "/user/register"
}))


usersRoutes.post('/login', passport.authenticate("login", {
    successRedirect: "/user/main",
    failureRedirect: "/user/login"
}))



export default usersRoutes;




