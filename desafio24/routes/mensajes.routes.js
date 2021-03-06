import express from 'express';
import Mensaje from '../controllers/Mensaje.js';
import { validate } from '../passport/auth.js'
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.post('/', msg.addMsg);
routerMsg.get('/', msg.findAllMsg);

export default routerMsg;