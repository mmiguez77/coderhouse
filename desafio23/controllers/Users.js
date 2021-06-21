import UserModel from '../models/userSchema.js';
import passport from "passport";

class User {

    
    async registerGet(req, res, next) {
        res.render('register')
    }

    async registerPost(req, res) {
        const data = { ...req.body };
        console.log(data)

    }

    async loginGet(req, res, next) {
        res.render('login')
    }

    async loginPost(req, res) {
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