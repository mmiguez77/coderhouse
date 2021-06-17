import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser'
const routerAccess = express.Router();
routerAccess.use(cookieParser())

routerAccess.use(session({
    name: 'Desafio21',
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000, //60000 = 1 minuto
    }
}))

routerAccess.get('/login', (req, res) => {
    let user = req.body.user
    req.session.user = user
    if (req.session.user) {
        res.render('login', { name: req.session.user })
        if (!req.session.user) {
            res.redirect('/')
        }
    }
    else {
        res.send(`Error en el Login`)
    }
})

routerAccess.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: 'Error' })
        } else {
            //let name = req.query.name
            //res.render('logout', { name })
            return setTimeout(() => {
                res.redirect('/')
            }, 2000);
        }
    })
})

routerAccess.get('/register', (req, res) => {
    res.render('register')
})

export default routerAccess;




