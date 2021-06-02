import express from 'express';
const productosRoutes = express.Router();

//import Producto from '../controllers/ProductoMongo.js';
// const producto = new Producto()

import ArrayProducto from '../controllers/ProductoArray.js'
const array = new ArrayProducto()




productosRoutes.get('/', array.viewAll)
productosRoutes.get('/:id', array.viewByID)
productosRoutes.post('/', array.add)
productosRoutes.delete('/:id', array.drop)
productosRoutes.put('/:id', array.update)


export default productosRoutes;