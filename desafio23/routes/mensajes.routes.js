const express = require ('express');
const Mensaje = require ('../controllers/Mensaje.js');
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.post('/', msg.addMsg);
routerMsg.get('/', msg.findAllMsg);

module.exports = routerMsg;