import logger from '../config/winston.js';


export default class User {

    async registerGet(req, res) {
        try {
            res.status(200).json('Usuario registrado con exito');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async loginGet(req, res) {
        try {
            res.status(200).json('LOGIN PAGE');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async mainGet(req, res) {
        try {
            const user = req.user;
            res.status(200).json(`Bienvenido ${user.username}. Login o Registro completado con exito`);
            logger.info.info('User Login');
        } catch (error) {
            logger.error.error(error);

        }
    }

    async logout(req, res) {
        try {
            req.logout();
            res.status(200).json('LOGOUT - Hasta Luego');
        } catch (error) {
            logger.error.error(error);

        }
    }
}