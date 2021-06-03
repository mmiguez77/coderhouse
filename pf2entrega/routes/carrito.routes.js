import express from 'express';
const cartRoutes = express.Router();

//import Cart from '../controllers/CarritoMongo.js';
//const cart = new Cart()

//import ArrayCart from '../controllers/CarritoArray.js'
//const cart = new ArrayCart()

import FsCart from '../controllers/CarritoFS.js'
const cart = new FsCart();


cartRoutes.get('/', cart.viewAllCart)
cartRoutes.get('/:id', cart.viewByIdCart)
cartRoutes.post('/:id', cart.addCart)
cartRoutes.delete('/:id', cart.deleteCart)



export default cartRoutes;