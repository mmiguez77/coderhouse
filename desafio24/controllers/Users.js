export default class User {

    async registerGet(req, res) {
        res.render('register')
    }

    async loginGet(req, res) {
        res.render('login')
    }

    mainGet(req, res) {
        res.render('main')
    }

    async logout(req, res) {
        req.logout();
        res.redirect('/user/login')
    }
}