import UserModel from '../models/userSchema.js';
import passport from "passport";

class User {


    async registerGet(req, res, next) {


        res.render('register')
    }

    async registerPost(req, res, next) {
        console.log('REGISTER', req.body)
        res.redirect('/user/login')
        next();
    }

    async loginGet(req, res, next) {
        res.render('login')
    }

    async loginPost(req, res) {
        console.log(req.body)
        res.redirect('/user/main')
    }

    async mainGet(req, res, next) {
        res.render('main')
    }

    async logout(req, res) {
        res.send('Logout')
        // req.session.destroy(err => {
        //     if (err) {
        //         res.json({ error: 'Error' });
        //     } else {
        //         return setTimeout(() => {
        //             res.redirect('/');
        //         }, 2000);
        //     }
        // })
    }

}

export default User