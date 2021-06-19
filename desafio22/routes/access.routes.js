import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
const routerAccess = express.Router();
routerAccess.use(cookieParser());

const uri = 'mongodb+srv://proyecto:coder@cluster0.tqtau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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

routerAccess.post('/login', (req, res, next) => {
    let username = req.body.username;
    req.session.username = username;
    res.redirect('/access/login');
    next()
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


export default routerAccess;




