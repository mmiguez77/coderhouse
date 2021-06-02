import express from 'express';
import Cart from '../controllers/CarritoMongo.js';
const cart = new Cart()
const cartRoutes = express.Router();


cartRoutes.get('/', cart.viewAllCart)
cartRoutes.get('/:id', cart.viewByIdCart)
cartRoutes.post('/:id', cart.addCart)
cartRoutes.delete('/:id', cart.deleteCart)



export default cartRoutes;