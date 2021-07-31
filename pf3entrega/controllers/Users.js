import logger from '../config/winston.js';

export default class User {

    async registerGet(req, res) {
        try {
            //res.render('register')
            res.status(200).json('Usuario registrado con exito');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async loginGet(req, res) {
        try {
            // res.render('login')
            res.status(200).json('LOGIN PAGE');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async mainGet(req, res) {
        try {
            // res.render('main')
            res.status(200).json('Bienvenido a su dashboard. Login o Registro completado con exito');
            let user = req.user;
            logger.info.info('User Login');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async logout(req, res) {
        try {
            req.logout();
            // res.redirect('/user/login')
            res.status(200).json('LOGOUT - Hasta Luego');
        } catch (error) {
            logger.error.error(error);

        }
    }
}