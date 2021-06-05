import express from 'express';
import Carrito from '../controllers/Carrito.js'
const cartRoutes = express.Router();
const cart = new Carrito(6);

cartRoutes.get('/', cart.viewAllCart);
cartRoutes.get('/:id', cart.viewByIdCart);
cartRoutes.post('/', cart.addCart);
cartRoutes.delete('/:id', cart.deleteCart);

export default cartRoutes;

//1 - MongoDB (local / cloud)
//2 - Firebase
//3 - FS
//4 - Sql Local
//5 - Sql Cloud
//6 - Sqlite
//7 - Array (default)