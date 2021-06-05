import express from 'express';
import Producto from '../dao/Producto.js';
const productosRoutes = express.Router();
const producto = new Producto(1);

productosRoutes.get('/', producto.viewAll)
productosRoutes.get('/:id', producto.viewByID)
productosRoutes.post('/', producto.add)
productosRoutes.delete('/:id', producto.drop)
productosRoutes.put('/:id', producto.update)

export default productosRoutes;

//1 - MongoDB (local / cloud en Producto.js)
//2 - Firebase
//3 - FS
//4 - Sql Local
//5 - Sql Cloud
//6 - Sqlite
//7 - Array (default)