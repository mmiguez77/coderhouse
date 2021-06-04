import express from 'express';
const cartRoutes = express.Router();

//import Cart from '../controllers/CarritoMongo.js';
//const cart = new Cart()

//import ArrayCart from '../controllers/CarritoArray.js'
//const cart = new ArrayCart()

//import FsCart from '../controllers/CarritoFS.js'
//const cart = new FsCart();

import CarritoSql from '../controllers/CarritoSqlLocal.js'
const cart = new CarritoSql()

cartRoutes.get('/', cart.viewAllCart)
cartRoutes.get('/:id', cart.viewByIdCart)
cartRoutes.post('/', cart.addCart)
cartRoutes.delete('/:id', cart.deleteCart)



export default cartRoutes;