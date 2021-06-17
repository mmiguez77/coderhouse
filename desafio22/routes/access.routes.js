import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
const routerAccess = express.Router();
routerAccess.use(cookieParser());

const uri = 'mongodb+srv://proyecto:coder@cluster0.tqtau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true };

routerAccess.use(session({
    store: MongoStore.create({ mongoUrl: uri, mongoOptions: options }),
    ttl: 30,
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

routerAccess.post('/login', (req, res) => {
    let username = req.body.user;
    req.session.username = username;
    
    let password = req.body.password;
    req.session.password = password;

    res.redirect('/access/login')
})


routerAccess.get('/login', (req, res) => {
    let username = req.body.user;
    req.session.username = username;
    if (req.session.username) {
        res.render('login', { name: req.session.username });
        if (!req.session.username) {
            res.redirect('/');
        }
    }
    else {
        res.send(`Error en el Login`);
    }
})

routerAccess.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: 'Error' });
        } else {
            //let name = req.query.name;
            //res.render('logout', { name });
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




