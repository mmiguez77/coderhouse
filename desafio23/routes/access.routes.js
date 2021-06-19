import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userSchema from '../models/userSchema.js'

const routerAccess = express.Router();
routerAccess.use(cookieParser());

const uri = 'mongodb://localhost:27017/session'
const options = { useNewUrlParser: true, useUnifiedTopology: true };

routerAccess.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        mongoOptions: options,
        ttl: 60 * 10, // en segundos
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))


/* --- Registro --- */
routerAccess.post('/register', async (req, res) => {
    try {
        let user = await { ...req.body };
        req.session.username = user.username;
        req.session.password = user.password;

        console.log(user)

        if (username && password) {
            res.redirect('/access/login', { msg: 'Registro realizado con éxito' });
        } else {
            res.redirect('/access/errLogin');
        }
        const usuario = UserModel.create(user)
    } catch (error) {
        console.error(error)
    }
})

routerAccess.post('/login', async (req, res, next) => {
    try {
        let user = await { ...req.body };
        if (user) {
            res.redirect('/access/login');
        }
        next()
    } catch (error) {
        console.error(error)
    }

})


routerAccess.get('/login', (req, res) => {
    if (req.session.username) {
        res.render('login', { name: req.session.username });
    }
    else {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
})

routerAccess.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: 'Error' });
        } else {
            return setTimeout(() => {
                res.redirect('/');
            }, 2000);
        }
    })
})

routerAccess.get('/register', (req, res) => {
    res.render('register');
})


export default routerAccess;




