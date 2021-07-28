import express from 'express';
import Producto from '../dao/Producto.js';
const productosRoutes = express.Router();

/*  -- NUMEROS CORRESPONDIENTES A CADA DB --
* 1 - MongoDB (Local) / 2 - Firebase / 3 - FS / 4 - Sql Local
* 5 - Sql Cloud / 6 - Sqlite / 7 - MongoDB (Cloud) / Array (default)
*/

const producto = new Producto(7); // Cambiar número en parametro para acceder a las diferentes DB

productosRoutes.get('/', producto.viewAll)
productosRoutes.get('/:id', producto.viewByID)
productosRoutes.get('/title/:title', producto.viewByName)
productosRoutes.get('/code/:code', producto.viewByCode)
productosRoutes.get('/price/:condition', producto.orderByPrice)
productosRoutes.get('/stock/:stock', producto.orderByStock)
productosRoutes.post('/', producto.add)
productosRoutes.delete('/:id', producto.drop)
productosRoutes.put('/:id', producto.update)

export default productosRoutes;


