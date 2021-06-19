const express = require ('express');
const mongoose = require ('mongoose');
const routerAccess = express.Router();

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

routerAccess.get('/register', (req, res) => {
    res.render('register');
})


/* --- Log In --- */
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

/* --- Log Out --- */

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



module.exports = routerAccess;




