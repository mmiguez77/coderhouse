import express from 'express';
import User from '../controllers/Users.js'
const usersRoutes = express.Router();
const user = new User();

usersRoutes.get('/register', user.registerGet )
usersRoutes.post('register', user.registerPost)
usersRoutes.get('/login', user.loginGet )
usersRoutes.post('/login', user.loginPost )
usersRoutes.get('/main', user.mainGet)
usersRoutes.get('/logout', user.logout)


export default usersRoutes;




