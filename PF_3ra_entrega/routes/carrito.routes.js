import express from 'express';
import CarritoMongo from '../controllers/Carrito_db_Mongo.js';
import { validate } from '../passport/auth.js';
const cartRoutes = express.Router();

const cart = new CarritoMongo();

cartRoutes.get('/',  validate, cart.viewAllCart);
cartRoutes.get('/:id',  validate, cart.viewByIdCart);
cartRoutes.post('/',  validate, cart.addCart);
cartRoutes.delete('/:id',  validate, cart.deleteCart);
cartRoutes.post('/checkout',  validate, cart.checkoutProduct);

export default cartRoutes;

