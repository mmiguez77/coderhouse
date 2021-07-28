import express from 'express';
import Carrito from '../dao/Carrito.js'
const cartRoutes = express.Router();

/*  -- NUMEROS CORRESPONDIENTES A CADA DB --
* 1 - MongoDB (Local) / 2 - Firebase / 3 - FS / 4 - Sql Local
* 5 - Sql Cloud / 6 - Sqlite / 7 - MongoDB (Cloud) / Array (default)
*/

const cart = new Carrito(7); // Cambiar número en parametro para acceder a las diferentes DB

cartRoutes.get('/', cart.viewAllCart);
cartRoutes.get('/:id', cart.viewByIdCart);
cartRoutes.post('/', cart.addCart);
cartRoutes.delete('/:id', cart.deleteCart);

export default cartRoutes;

