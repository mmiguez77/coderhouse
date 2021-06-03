import express from 'express';
const productosRoutes = express.Router();

//import Producto from '../controllers/ProductoMongo.js';
// const producto = new Producto()

// import ArrayProducto from '../controllers/ProductoArray.js'
// const producto = new ArrayProducto()

import FsProducto from '../controllers/ProductoFS.js'
const producto = new FsProducto();


productosRoutes.get('/', producto.viewAll)
productosRoutes.get('/:id', producto.viewByID)
productosRoutes.post('/', producto.add)
productosRoutes.delete('/:id', producto.drop)
productosRoutes.put('/:id', producto.update)


export default productosRoutes;