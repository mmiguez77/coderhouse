const express = require ('express');
const passport = require('passport');
const routerAccess = express.Router();


/* --- Registro --- */
routerAccess.post('/register', passport.authenticate('register',{
    successRedirect: '/login',
    failureRedirect: '/',
    passReqToCallback: true
}))

routerAccess.get('/register', (req, res) => {
    res.render('register');
})


/* --- Log In --- */
// routerAccess.post('/login', async (req, res, next) => {
//     try {
//         let username = await { ...req.body };
//         if (user) {
//             res.redirect('/access/login');
//         }
//         next()
//     } catch (error) {
//         console.error(error)
//     }

// })


routerAccess.get('/login', (req, res) => {
    res.render('login')
})

/* --- Log Out --- */

// routerAccess.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             res.json({ error: 'Error' });
//         } else {
//             return setTimeout(() => {
//                 res.redirect('/');
//             }, 2000);
//         }
//     })
// })



module.exports = routerAccess;




