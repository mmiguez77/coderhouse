const express = require ('express');
const Mensaje = require ('../controllers/Mensaje.js');
const validate = require ('../passport/auth.js');
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.post('/', validate, msg.addMsg);
routerMsg.get('/', validate, msg.findAllMsg);
routerMsg.get('/norm', msg.normalizedData);

module.exports = routerMsg;