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
        ttl: 30, // en segundos
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

// routerAccess.post('/login', (req, res) => {
//     let username = req.body.username;
//     req.session.username = username;
//     if (req.session.username) {
//         res.render('login', { name: req.session.username });
//     } else {
//         res.redirect('/');
//     }
// })


routerAccess.get('/login', (req, res) => {
    let username = req.query.username;
    req.session.username = username;
    if (req.session.username) {
        res.render('login', { name: req.session.username });
    }
    else {
        res.redirect('/');
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




