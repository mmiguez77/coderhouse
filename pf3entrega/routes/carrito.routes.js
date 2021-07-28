import express from 'express';
import CarritoMongo from '../controllers/Carrito_db_Mongo.js';
const cartRoutes = express.Router();

const cart = new CarritoMongo();

cartRoutes.get('/', cart.viewAllCart);
cartRoutes.get('/:id', cart.viewByIdCart);
cartRoutes.post('/', cart.addCart);
cartRoutes.delete('/:id', cart.deleteCart);

export default cartRoutes;

