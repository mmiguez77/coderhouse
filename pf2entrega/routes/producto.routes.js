import express from 'express';
const productosRoutes = express.Router();

//import Producto from '../controllers/ProductoMongo.js';
// const producto = new Producto()

import Array from '../controllers/ProductoArray.js'
const array = new Array()




productosRoutes.get('/', array.viewAll)
productosRoutes.get('/:id', array.viewByID)
productosRoutes.post('/', array.add)
productosRoutes.delete('/:id', array.drop)
productosRoutes.put('/:id', array.update)


export default productosRoutes;